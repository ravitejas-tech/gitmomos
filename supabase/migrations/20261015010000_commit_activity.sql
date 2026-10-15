create type public.work_kind as enum ('feature', 'fix', 'improvement', 'maintenance', 'docs', 'tests', 'other');

create or replace function public.commit_kind(message text)
returns public.work_kind
language sql
immutable
set search_path = ''
as $$
    select (case
        when m ~ '^(feat|feature)\y' then 'feature'
        when m ~ '^(fix|bugfix|hotfix)\y' then 'fix'
        when m ~ '^(refactor|perf|style)\y' then 'improvement'
        when m ~ '^docs?\y' then 'docs'
        when m ~ '^tests?\y' then 'tests'
        when m ~ '^(chore|build|ci|deps|release|revert|merge|bump)\y' then 'maintenance'
        when m ~ '\y(fix|fixes|fixed|bug|bugs|crash|broken|resolve|resolves|resolved)\y' then 'fix'
        when m ~ '^(add|adds|added|implement|introduce|create|support|enable|allow|new)\y' then 'feature'
        when m ~ '^(clean|simplify|optimi[sz]e|speed|improve|rework|tidy|rename|move|update)' then 'improvement'
        when m ~ '\y(readme|docs?|documentation|changelog)\y' then 'docs'
        when m ~ '\y(tests?|specs?|coverage)\y' then 'tests'
        when m ~ '^(upgrade|version|wip)\y' then 'maintenance'
        else 'other'
    end)::public.work_kind
    from (select lower(btrim(message)) as m) as normalized;
$$;

alter table public.commits
    add column kind public.work_kind not null generated always as (public.commit_kind(message)) stored;

create or replace function public.get_activity(p_from date, p_to date)
returns jsonb
language sql
stable
set search_path = ''
as $$
    with settings as (
        select timezone, p_to - p_from + 1 as span
        from public.profiles
        where id = (select auth.uid())
    ),
    scoped as (
        select
            (c.committed_at at time zone s.timezone) as local_at,
            c.kind,
            r.full_name as repository
        from public.commits c
        join public.repositories r on r.id = c.repository_id
        cross join settings s
        where c.committed_at >= ((p_from - s.span)::timestamp at time zone s.timezone)
          and c.committed_at < ((p_to + 1)::timestamp at time zone s.timezone)
    ),
    period as (
        select local_at, local_at::date as day, kind, repository from scoped where local_at::date >= p_from
    ),
    previous as (
        select local_at::date as day from scoped where local_at::date < p_from
    ),
    day_kinds as (
        select day, kind, count(*) as commits from period group by day, kind
    ),
    daily as (
        select
            d::date as day,
            coalesce(sum(k.commits), 0) as commits,
            coalesce(jsonb_object_agg(k.kind::text, k.commits) filter (where k.kind is not null), '{}'::jsonb) as kinds
        from generate_series(p_from, p_to, interval '1 day') as d
        left join day_kinds k on k.day = d::date
        group by d
    )
    select jsonb_build_object(
        'daily', coalesce(
            (select jsonb_agg(jsonb_build_object('date', day, 'commits', commits, 'kinds', kinds) order by day) from daily),
            '[]'::jsonb
        ),
        'repositories', coalesce(
            (
                select jsonb_agg(jsonb_build_object('name', repository, 'commits', commits) order by commits desc, repository)
                from (select repository, count(*) as commits from period group by repository) as totals
            ),
            '[]'::jsonb
        ),
        'kinds', coalesce(
            (
                select jsonb_agg(jsonb_build_object('kind', kind, 'commits', commits) order by commits desc)
                from (select kind, count(*) as commits from period group by kind) as totals
            ),
            '[]'::jsonb
        ),
        'hours', (
            select jsonb_agg(
                jsonb_build_object('hour', h, 'commits', (select count(*) from period where extract(hour from local_at) = h))
                order by h
            )
            from generate_series(0, 23) as h
        ),
        'previous', jsonb_build_object(
            'commits', (select count(*) from previous),
            'active_days', (select count(distinct day) from previous)
        )
    );
$$;

revoke all on function public.get_activity(date, date) from public, anon;
grant execute on function public.get_activity(date, date) to authenticated;
