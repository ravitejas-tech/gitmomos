create extension if not exists vector with schema extensions;

alter table public.profiles
    add column handle text unique check (handle ~ '^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$'),
    add column tagline text check (char_length(tagline) <= 120),
    add column is_public boolean not null default false,
    add constraint profiles_public_handle check (not is_public or handle is not null);

alter table public.repositories add column on_profile boolean not null default false;

create table public.report_embeddings (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    report_id uuid not null unique references public.reports (id) on delete cascade,
    embedding extensions.vector(768) not null,
    created_at timestamptz not null default now()
);

create table public.profile_questions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    client_hash text not null,
    created_at timestamptz not null default now()
);

alter table public.report_embeddings enable row level security;
alter table public.profile_questions enable row level security;

revoke all on public.report_embeddings from anon, authenticated;
revoke all on public.profile_questions from anon, authenticated;

grant update (handle, tagline, is_public) on public.profiles to authenticated;
grant update (on_profile) on public.repositories to authenticated;

create or replace function public.forget_report_embedding()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    delete from public.report_embeddings where report_id = new.id;
    return null;
end;
$$;

create trigger reports_forget_embedding
    after update of content on public.reports
    for each row
    when (old.content is distinct from new.content)
    execute function public.forget_report_embedding();

create or replace function public.is_profile_report(p_user_id uuid, p_content jsonb)
returns boolean
language sql
stable
set search_path = ''
as $$
    select jsonb_typeof(p_content -> 'repositories') = 'array'
        and jsonb_array_length(p_content -> 'repositories') > 0
        and not exists (
            select 1
            from jsonb_array_elements(p_content -> 'repositories') as item
            where not exists (
                select 1
                from public.repositories r
                where r.user_id = p_user_id
                  and r.enabled
                  and r.on_profile
                  and r.full_name = item ->> 'name'
            )
        );
$$;

create or replace function public.get_public_profile(p_handle text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    with owner as (
        select id, handle, full_name, tagline, timezone, (now() at time zone timezone)::date as today
        from public.profiles
        where handle = lower(p_handle) and is_public
    ),
    year_commits as (
        select (c.committed_at at time zone o.timezone)::date as day, c.repository_id
        from public.commits c
        cross join owner o
        where c.user_id = o.id
          and c.committed_at >= ((o.today - 364)::timestamp at time zone o.timezone)
    ),
    days as (
        select day, count(*) as commits from year_commits group by day
    ),
    runs as (
        select count(*) as length
        from (select day - (row_number() over (order by day))::integer as run from days) as numbered
        group by run
    ),
    shown as (
        select r.date, r.content
        from public.reports r
        cross join owner o
        where r.user_id = o.id
          and r.status = 'generated'
          and public.is_profile_report(o.id, r.content)
    )
    select jsonb_build_object(
        'handle', o.handle,
        'name', coalesce(nullif(btrim(o.full_name), ''), o.handle),
        'tagline', o.tagline,
        'stats', jsonb_build_object(
            'commits', (select count(*) from year_commits),
            'active_days', (select count(*) from days),
            'longest_streak', coalesce((select max(length) from runs), 0),
            'projects', (select count(distinct repository_id) from year_commits),
            'reports', (select count(*) from shown)
        ),
        'daily', (
            select jsonb_agg(jsonb_build_object('date', d::date, 'commits', coalesce(days.commits, 0)) order by d)
            from generate_series(
                o.today - (extract(isodow from o.today)::integer - 1) - 25 * 7,
                o.today,
                interval '1 day'
            ) as d
            left join days on days.day = d::date
        ),
        'recent', coalesce(
            (
                select jsonb_agg(jsonb_build_object('date', latest.date, 'headline', latest.content ->> 'headline'))
                from (select date, content from shown order by date desc limit 5) as latest
            ),
            '[]'::jsonb
        )
    )
    from owner o;
$$;

create or replace function public.match_profile_reports(
    p_user_id uuid,
    p_embedding text,
    p_similar integer,
    p_recent integer
)
returns table (date date, content jsonb)
language sql
stable
security definer
set search_path = ''
as $$
    with shown as (
        select r.id, r.date, r.content
        from public.reports r
        where r.user_id = p_user_id
          and r.status = 'generated'
          and public.is_profile_report(p_user_id, r.content)
    ),
    closest as (
        select s.id
        from shown s
        join public.report_embeddings e on e.report_id = s.id
        order by e.embedding operator(extensions.<=>) p_embedding::extensions.vector
        limit p_similar
    ),
    recent as (
        select id from shown order by date desc limit p_recent
    )
    select s.date, s.content
    from shown s
    where s.id in (select id from closest union select id from recent)
    order by s.date desc;
$$;

create or replace function public.claim_profile_question(
    p_user_id uuid,
    p_client_hash text,
    p_hourly_limit integer,
    p_daily_limit integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
    perform pg_advisory_xact_lock(hashtextextended(p_user_id::text, 0));

    delete from public.profile_questions where created_at < now() - interval '1 day';

    if (select count(*) from public.profile_questions where user_id = p_user_id) >= p_daily_limit
        or (
            select count(*)
            from public.profile_questions
            where user_id = p_user_id
              and client_hash = p_client_hash
              and created_at >= now() - interval '1 hour'
        ) >= p_hourly_limit
    then
        return false;
    end if;

    insert into public.profile_questions (user_id, client_hash) values (p_user_id, p_client_hash);
    return true;
end;
$$;

revoke all on function public.forget_report_embedding() from public, anon, authenticated;
revoke all on function public.is_profile_report(uuid, jsonb) from public, anon, authenticated;
revoke all on function public.get_public_profile(text) from public;
revoke all on function public.match_profile_reports(uuid, text, integer, integer) from public, anon, authenticated;
revoke all on function public.claim_profile_question(uuid, text, integer, integer) from public, anon, authenticated;
grant execute on function public.get_public_profile(text) to anon, authenticated;
grant execute on function public.match_profile_reports(uuid, text, integer, integer) to service_role;
grant execute on function public.claim_profile_question(uuid, text, integer, integer) to service_role;
