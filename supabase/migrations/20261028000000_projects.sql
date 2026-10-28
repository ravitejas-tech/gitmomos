create table public.projects (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    name text not null check (char_length(name) between 1 and 60),
    description text check (char_length(description) <= 280),
    url text check (url ~ '^https?://\S+$' and char_length(url) <= 300),
    is_public boolean not null default false,
    tracks_milestones boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (user_id, slug)
);

create table public.project_repositories (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    project_id uuid not null references public.projects (id) on delete cascade,
    repository_id uuid not null references public.repositories (id) on delete cascade,
    created_at timestamptz not null default now(),
    unique (project_id, repository_id)
);

create table public.milestones (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    report_id uuid not null references public.reports (id) on delete cascade,
    repository_id uuid not null references public.repositories (id) on delete cascade,
    date date not null,
    title text not null,
    detail text not null default '',
    hidden boolean not null default false,
    created_at timestamptz not null default now()
);

create table public.milestone_scans (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    report_id uuid not null unique references public.reports (id) on delete cascade,
    created_at timestamptz not null default now()
);

create trigger projects_updated_at before update on public.projects
    for each row execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.project_repositories enable row level security;
alter table public.milestones enable row level security;
alter table public.milestone_scans enable row level security;

create policy "Read own projects" on public.projects
    for select to authenticated using ((select auth.uid()) = user_id);
create policy "Delete own projects" on public.projects
    for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Read own milestones" on public.milestones
    for select to authenticated using ((select auth.uid()) = user_id);
create policy "Update own milestones" on public.milestones
    for update to authenticated using ((select auth.uid()) = user_id);

revoke insert, update on public.projects from anon, authenticated;
revoke all on public.project_repositories from anon, authenticated;
revoke insert, update, delete on public.milestones from anon, authenticated;
grant update (hidden) on public.milestones to authenticated;
revoke all on public.milestone_scans from anon, authenticated;

create function public.forget_milestone_scan()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    delete from public.milestone_scans where report_id = new.id;
    return null;
end;
$$;

create trigger reports_forget_milestone_scan
    after update of content on public.reports
    for each row
    when (old.content is distinct from new.content)
    execute function public.forget_milestone_scan();

create function public.report_repository_ids(p_user_id uuid, p_content jsonb)
returns table (repository_id uuid)
language sql
stable
set search_path = ''
as $$
    select r.id
    from jsonb_array_elements(public.array_or_empty(p_content -> 'repositories')) as item
    join public.repositories r on r.user_id = p_user_id and r.full_name = item ->> 'name';
$$;

create function public.project_milestones(p_project_id uuid)
returns table (id uuid, report_id uuid, date date, title text, detail text)
language sql
stable
set search_path = ''
as $$
    select m.id, m.report_id, m.date, m.title, m.detail
    from public.projects p
    join public.project_repositories pr on pr.project_id = p.id
    join public.milestones m on m.repository_id = pr.repository_id
    where p.id = p_project_id
      and p.tracks_milestones
      and not m.hidden;
$$;

create function public.public_projects(p_handle text)
returns setof public.projects
language sql
stable
set search_path = ''
as $$
    select pr.*
    from public.projects pr
    join public.profiles p on p.id = pr.user_id
    where p.handle = lower(p_handle)
      and p.is_public
      and pr.is_public;
$$;

create function public.save_project(
    p_name text,
    p_is_public boolean,
    p_tracks_milestones boolean,
    p_repository_ids uuid[],
    p_description text default null,
    p_url text default null,
    p_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_user_id uuid := (select auth.uid());
    v_project_id uuid := p_id;
    v_base text;
    v_slug text;
    v_suffix integer := 1;
begin
    if coalesce(cardinality(p_repository_ids), 0) = 0 or exists (
        select 1
        from unnest(p_repository_ids) as picked (id)
        where not exists (select 1 from public.repositories r where r.id = picked.id and r.user_id = v_user_id)
    ) then
        raise exception 'Choose at least one of your repositories' using errcode = '22023';
    end if;

    if v_project_id is null then
        v_base := coalesce(
            nullif(btrim(left(regexp_replace(lower(p_name), '[^a-z0-9]+', '-', 'g'), 50), '-'), ''),
            'project'
        );
        v_slug := v_base;
        while exists (select 1 from public.projects where user_id = v_user_id and slug = v_slug) loop
            v_suffix := v_suffix + 1;
            v_slug := v_base || '-' || v_suffix;
        end loop;

        insert into public.projects (user_id, slug, name, description, url, is_public, tracks_milestones)
        values (
            v_user_id,
            v_slug,
            btrim(p_name),
            nullif(btrim(p_description), ''),
            nullif(btrim(p_url), ''),
            p_is_public,
            p_tracks_milestones
        )
        returning id into v_project_id;
    else
        update public.projects
        set name = btrim(p_name),
            description = nullif(btrim(p_description), ''),
            url = nullif(btrim(p_url), ''),
            is_public = p_is_public,
            tracks_milestones = p_tracks_milestones
        where id = v_project_id and user_id = v_user_id;

        if not found then
            raise exception 'Project not found' using errcode = 'P0002';
        end if;
    end if;

    delete from public.project_repositories
    where project_id = v_project_id and not (repository_id = any (p_repository_ids));

    insert into public.project_repositories (user_id, project_id, repository_id)
    select v_user_id, v_project_id, picked.id
    from unnest(p_repository_ids) as picked (id)
    on conflict (project_id, repository_id) do nothing;

    return v_project_id;
end;
$$;

create function public.get_projects()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    with mine as (
        select * from public.projects where user_id = (select auth.uid())
    ),
    linked as (
        select pr.project_id, pr.repository_id
        from public.project_repositories pr
        join mine m on m.id = pr.project_id
    ),
    unscanned as (
        select r.id, touched.repository_id
        from public.reports r
        cross join public.report_repository_ids(r.user_id, r.content) as touched
        where r.user_id = (select auth.uid())
          and r.status = 'generated'
          and not exists (select 1 from public.milestone_scans s where s.report_id = r.id)
    )
    select coalesce(
        jsonb_agg(
            jsonb_build_object(
                'id', m.id,
                'slug', m.slug,
                'name', m.name,
                'description', m.description,
                'url', m.url,
                'is_public', m.is_public,
                'tracks_milestones', m.tracks_milestones,
                'repository_ids', coalesce(
                    (select jsonb_agg(l.repository_id) from linked l where l.project_id = m.id),
                    '[]'::jsonb
                ),
                'milestones', (select count(*) from public.project_milestones(m.id)),
                'latest', (
                    select jsonb_build_object('date', pm.date, 'title', pm.title)
                    from public.project_milestones(m.id) pm
                    order by pm.date desc
                    limit 1
                ),
                'pending', case when m.tracks_milestones then (
                    select count(distinct u.id)
                    from unscanned u
                    join linked l on l.repository_id = u.repository_id
                    where l.project_id = m.id
                ) else 0 end
            )
            order by m.created_at desc
        ),
        '[]'::jsonb
    )
    from mine m;
$$;

create function public.get_public_projects(p_handle text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select coalesce(
        jsonb_agg(
            jsonb_build_object(
                'slug', p.slug,
                'name', p.name,
                'description', p.description,
                'url', p.url,
                'milestones', (select count(*) from public.project_milestones(p.id)),
                'latest', (
                    select jsonb_build_object('date', pm.date, 'title', pm.title)
                    from public.project_milestones(p.id) pm
                    order by pm.date desc
                    limit 1
                )
            )
            order by p.created_at desc
        ),
        '[]'::jsonb
    )
    from public.public_projects(p_handle) p;
$$;

create function public.get_public_project(p_handle text, p_slug text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select jsonb_build_object(
        'handle', o.handle,
        'owner', coalesce(nullif(btrim(o.full_name), ''), o.handle),
        'slug', p.slug,
        'name', p.name,
        'description', p.description,
        'url', p.url,
        'milestones', coalesce(
            (
                select jsonb_agg(
                    jsonb_build_object(
                        'id', pm.id,
                        'date', pm.date,
                        'title', pm.title,
                        'detail', pm.detail,
                        'shared', public.is_profile_report(p.user_id, r.content)
                    )
                    order by pm.date desc, pm.title
                )
                from public.project_milestones(p.id) pm
                join public.reports r on r.id = pm.report_id
            ),
            '[]'::jsonb
        )
    )
    from public.public_projects(p_handle) p
    join public.profiles o on o.id = p.user_id
    where p.slug = lower(p_slug);
$$;

create function public.pending_milestone_reports(p_user_id uuid, p_limit integer)
returns table (id uuid, date date, updated_at timestamptz, content jsonb)
language sql
stable
security definer
set search_path = ''
as $$
    select r.id, r.date, r.updated_at, r.content
    from public.reports r
    where r.user_id = p_user_id
      and r.status = 'generated'
      and not exists (select 1 from public.milestone_scans s where s.report_id = r.id)
      and exists (
          select 1
          from public.report_repository_ids(p_user_id, r.content) as touched
          join public.project_repositories pr on pr.repository_id = touched.repository_id
          join public.projects p on p.id = pr.project_id
          where p.tracks_milestones
      )
    order by r.date desc
    limit p_limit;
$$;

create function public.record_milestones(p_user_id uuid, p_reports jsonb, p_milestones jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_report_ids uuid[];
begin
    select coalesce(array_agg(r.id), '{}')
    into v_report_ids
    from jsonb_to_recordset(p_reports) as scanned (id uuid, updated_at timestamptz)
    join public.reports r on r.id = scanned.id and r.updated_at = scanned.updated_at
    where r.user_id = p_user_id;

    delete from public.milestones where report_id = any (v_report_ids);

    insert into public.milestones (user_id, report_id, repository_id, date, title, detail)
    select p_user_id, r.id, repo.id, r.date, m.title, m.detail
    from jsonb_to_recordset(p_milestones) as m (report_id uuid, repository text, title text, detail text)
    join public.reports r on r.id = m.report_id
    join public.repositories repo on repo.user_id = p_user_id and repo.full_name = m.repository
    where r.id = any (v_report_ids);

    insert into public.milestone_scans (user_id, report_id)
    select p_user_id, unnest(v_report_ids)
    on conflict (report_id) do nothing;
end;
$$;

create function public.enqueue_milestone_scans()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_url text;
    v_secret text;
    v_count integer := 0;
    r record;
begin
    select decrypted_secret into v_url from vault.decrypted_secrets where name = 'project_url';
    select decrypted_secret into v_secret from vault.decrypted_secrets where name = 'worker_secret';

    if v_url is null or v_secret is null then
        raise warning 'gitmomos: vault secrets project_url / worker_secret missing, skipping milestone scans';
        return 0;
    end if;

    for r in
        select distinct p.user_id
        from public.projects p
        where p.tracks_milestones
          and exists (select 1 from public.ai_keys k where k.user_id = p.user_id)
          and exists (select 1 from public.pending_milestone_reports(p.user_id, 1))
    loop
        perform net.http_post(
            url := v_url || '/functions/v1/milestones',
            headers := jsonb_build_object(
                'Content-Type', 'application/json',
                'x-worker-secret', v_secret
            ),
            body := jsonb_build_object('userId', r.user_id),
            timeout_milliseconds := 150000
        );
        v_count := v_count + 1;
    end loop;

    return v_count;
end;
$$;

revoke all on function public.forget_milestone_scan() from public, anon, authenticated;
revoke all on function public.report_repository_ids(uuid, jsonb) from public, anon, authenticated;
revoke all on function public.project_milestones(uuid) from public, anon, authenticated;
revoke all on function public.public_projects(text) from public, anon, authenticated;
revoke all on function public.save_project(text, boolean, boolean, uuid[], text, text, uuid) from public, anon;
revoke all on function public.get_projects() from public, anon;
revoke all on function public.get_public_projects(text) from public;
revoke all on function public.get_public_project(text, text) from public;
revoke all on function public.pending_milestone_reports(uuid, integer) from public, anon, authenticated;
revoke all on function public.record_milestones(uuid, jsonb, jsonb) from public, anon, authenticated;
revoke all on function public.enqueue_milestone_scans() from public, anon, authenticated;
grant execute on function public.save_project(text, boolean, boolean, uuid[], text, text, uuid) to authenticated;
grant execute on function public.get_projects() to authenticated;
grant execute on function public.get_public_projects(text) to anon, authenticated;
grant execute on function public.get_public_project(text, text) to anon, authenticated;
grant execute on function public.pending_milestone_reports(uuid, integer) to service_role;
grant execute on function public.record_milestones(uuid, jsonb, jsonb) to service_role;

select cron.schedule('gitmomos-milestone-scan', '*/10 * * * *', 'select public.enqueue_milestone_scans()');
