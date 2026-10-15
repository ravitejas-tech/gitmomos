create extension if not exists pg_cron;
create extension if not exists pg_net with schema extensions;

create type public.provider_name as enum ('github', 'gitea');
create type public.connection_status as enum ('active', 'error');
create type public.report_status as enum ('generated', 'failed');

create or replace function public.is_valid_timezone(tz text)
returns boolean
language sql
stable
set search_path = ''
as $$
    select exists (select 1 from pg_catalog.pg_timezone_names where name = tz);
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at := now();
    return new;
end;
$$;

create table public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    email text not null,
    full_name text,
    timezone text not null default 'UTC' check (public.is_valid_timezone(timezone)),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table public.connections (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    provider public.provider_name not null,
    base_url text not null,
    account_login text not null,
    account_name text,
    avatar_url text,
    token_secret_id uuid,
    status public.connection_status not null default 'active',
    last_error text,
    last_synced_at timestamptz,
    created_at timestamptz not null default now(),
    unique (user_id, provider, base_url, account_login)
);

create table public.repositories (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    connection_id uuid not null references public.connections (id) on delete cascade,
    external_id text not null,
    full_name text not null,
    html_url text not null,
    default_branch text,
    is_private boolean not null default false,
    enabled boolean not null default false,
    pushed_at timestamptz,
    last_synced_at timestamptz,
    created_at timestamptz not null default now(),
    unique (connection_id, external_id)
);

create table public.commits (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    repository_id uuid not null references public.repositories (id) on delete cascade,
    sha text not null,
    message text not null,
    author_name text,
    author_email text,
    committed_at timestamptz not null,
    html_url text,
    created_at timestamptz not null default now(),
    unique (repository_id, sha)
);

create table public.reports (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    date date not null,
    status public.report_status not null,
    content jsonb,
    commit_count integer not null default 0,
    error text,
    edited_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (user_id, date)
);

create table public.oauth_states (
    state text primary key,
    user_id uuid not null references public.profiles (id) on delete cascade,
    provider public.provider_name not null,
    created_at timestamptz not null default now()
);

create index commits_user_committed_at_idx on public.commits (user_id, committed_at desc);
create index repositories_user_enabled_idx on public.repositories (user_id) where enabled;
create index reports_user_date_idx on public.reports (user_id, date desc);

create trigger profiles_updated_at before update on public.profiles
    for each row execute function public.set_updated_at();
create trigger reports_updated_at before update on public.reports
    for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_timezone text := new.raw_user_meta_data ->> 'timezone';
begin
    insert into public.profiles (id, email, full_name, timezone)
    values (
        new.id,
        new.email,
        new.raw_user_meta_data ->> 'full_name',
        case when public.is_valid_timezone(v_timezone) then v_timezone else 'UTC' end
    )
    on conflict (id) do nothing;
    return new;
end;
$$;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.connections enable row level security;
alter table public.repositories enable row level security;
alter table public.commits enable row level security;
alter table public.reports enable row level security;
alter table public.oauth_states enable row level security;

create policy "Read own profile" on public.profiles
    for select to authenticated using ((select auth.uid()) = id);
create policy "Update own profile" on public.profiles
    for update to authenticated using ((select auth.uid()) = id);

create policy "Read own connections" on public.connections
    for select to authenticated using ((select auth.uid()) = user_id);
create policy "Delete own connections" on public.connections
    for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Read own repositories" on public.repositories
    for select to authenticated using ((select auth.uid()) = user_id);
create policy "Update own repositories" on public.repositories
    for update to authenticated using ((select auth.uid()) = user_id);

create policy "Read own commits" on public.commits
    for select to authenticated using ((select auth.uid()) = user_id);

create policy "Read own reports" on public.reports
    for select to authenticated using ((select auth.uid()) = user_id);
create policy "Update own reports" on public.reports
    for update to authenticated using ((select auth.uid()) = user_id);

revoke insert, update on public.profiles from anon, authenticated;
grant update (full_name, timezone) on public.profiles to authenticated;

revoke insert, update on public.connections from anon, authenticated;

revoke insert, update on public.repositories from anon, authenticated;
grant update (enabled) on public.repositories to authenticated;

revoke insert, update, delete on public.commits from anon, authenticated;

revoke insert, update, delete on public.reports from anon, authenticated;
grant update (content, edited_at) on public.reports to authenticated;

revoke all on public.oauth_states from anon, authenticated;

create or replace function public.save_connection(
    p_user_id uuid,
    p_provider public.provider_name,
    p_base_url text,
    p_account_login text,
    p_token text,
    p_account_name text default null,
    p_avatar_url text default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_connection_id uuid;
    v_secret_id uuid;
begin
    insert into public.connections (user_id, provider, base_url, account_login, account_name, avatar_url)
    values (p_user_id, p_provider, p_base_url, p_account_login, p_account_name, p_avatar_url)
    on conflict (user_id, provider, base_url, account_login) do update
        set account_name = excluded.account_name,
            avatar_url = excluded.avatar_url,
            status = 'active',
            last_error = null
    returning id, token_secret_id into v_connection_id, v_secret_id;

    if v_secret_id is null then
        v_secret_id := vault.create_secret(p_token, 'gitmomos_connection_' || v_connection_id::text);
        update public.connections set token_secret_id = v_secret_id where id = v_connection_id;
    else
        perform vault.update_secret(v_secret_id, p_token);
    end if;

    return v_connection_id;
end;
$$;

create or replace function public.get_connection_token(p_connection_id uuid)
returns text
language sql
stable
security definer
set search_path = ''
as $$
    select ds.decrypted_secret
    from vault.decrypted_secrets ds
    join public.connections c on c.token_secret_id = ds.id
    where c.id = p_connection_id;
$$;

create or replace function public.delete_connection_token()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    if old.token_secret_id is not null then
        delete from vault.secrets where id = old.token_secret_id;
    end if;
    return old;
end;
$$;

create trigger connections_delete_token
    after delete on public.connections
    for each row execute function public.delete_connection_token();

create or replace function public.import_repositories(p_connection_id uuid, p_repositories jsonb)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_count integer;
begin
    insert into public.repositories (
        user_id, connection_id, external_id, full_name, html_url, default_branch, is_private, pushed_at, enabled
    )
    select
        c.user_id,
        c.id,
        r.external_id,
        r.full_name,
        r.html_url,
        r.default_branch,
        r.is_private,
        r.pushed_at,
        coalesce(r.pushed_at >= now() - interval '30 days', false)
    from public.connections c
    cross join jsonb_to_recordset(p_repositories) as r (
        external_id text,
        full_name text,
        html_url text,
        default_branch text,
        is_private boolean,
        pushed_at timestamptz
    )
    where c.id = p_connection_id
    on conflict (connection_id, external_id) do update
        set full_name = excluded.full_name,
            html_url = excluded.html_url,
            default_branch = excluded.default_branch,
            is_private = excluded.is_private,
            pushed_at = excluded.pushed_at;

    get diagnostics v_count = row_count;
    return v_count;
end;
$$;

create or replace function public.record_repository_commits(p_repository_id uuid, p_commits jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.commits (
        user_id, repository_id, sha, message, author_name, author_email, committed_at, html_url
    )
    select repo.user_id, repo.id, c.sha, c.message, c.author_name, c.author_email, c.committed_at, c.html_url
    from public.repositories repo
    cross join jsonb_to_recordset(p_commits) as c (
        sha text,
        message text,
        author_name text,
        author_email text,
        committed_at timestamptz,
        html_url text
    )
    where repo.id = p_repository_id
    on conflict (repository_id, sha) do nothing;

    update public.repositories set last_synced_at = now() where id = p_repository_id;
end;
$$;

revoke all on function public.save_connection(uuid, public.provider_name, text, text, text, text, text)
    from public, anon, authenticated;
revoke all on function public.get_connection_token(uuid) from public, anon, authenticated;
revoke all on function public.import_repositories(uuid, jsonb) from public, anon, authenticated;
revoke all on function public.record_repository_commits(uuid, jsonb) from public, anon, authenticated;
grant execute on function public.save_connection(uuid, public.provider_name, text, text, text, text, text)
    to service_role;
grant execute on function public.get_connection_token(uuid) to service_role;
grant execute on function public.import_repositories(uuid, jsonb) to service_role;
grant execute on function public.record_repository_commits(uuid, jsonb) to service_role;

create or replace function public.enqueue_daily_syncs()
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
        raise warning 'gitmomos: vault secrets project_url / worker_secret missing, skipping daily sync';
        return 0;
    end if;

    for r in
        select p.id, ((now() at time zone p.timezone)::date - 1) as report_date
        from public.profiles p
        where extract(hour from now() at time zone p.timezone) = 0
          and exists (
              select 1 from public.repositories repo
              where repo.user_id = p.id and repo.enabled
          )
    loop
        perform net.http_post(
            url := v_url || '/functions/v1/sync',
            headers := jsonb_build_object(
                'Content-Type', 'application/json',
                'x-worker-secret', v_secret
            ),
            body := jsonb_build_object('userId', r.id, 'date', r.report_date),
            timeout_milliseconds := 150000
        );
        v_count := v_count + 1;
    end loop;

    return v_count;
end;
$$;

revoke all on function public.enqueue_daily_syncs() from public, anon, authenticated;

select cron.schedule('gitmomos-daily-sync', '5 * * * *', 'select public.enqueue_daily_syncs()');
