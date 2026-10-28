create function public.commit_leaderboard()
returns table (profile_id uuid, handle text, commits bigint, rank bigint)
language sql
stable
set search_path = ''
as $$
    select p.id, p.handle, count(distinct c.sha), rank() over (order by count(distinct c.sha) desc)
    from public.profiles p
    left join public.commits c on c.user_id = p.id
    where p.is_public
    group by p.id, p.handle;
$$;

create function public.get_leaderboard(p_limit integer default 25, p_offset integer default 0)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    with board as (
        select * from public.commit_leaderboard()
    )
    select jsonb_build_object(
        'total', (select count(*) from board),
        'people', coalesce(
            (
                select jsonb_agg(
                    public.community_member(page.profile_id)
                        || jsonb_build_object('commits', page.commits, 'rank', page.rank)
                    order by page.rank, page.handle
                )
                from (
                    select *
                    from board
                    order by rank, handle
                    limit least(greatest(p_limit, 1), 100)
                    offset greatest(p_offset, 0)
                ) as page
            ),
            '[]'::jsonb
        )
    );
$$;

create or replace function public.get_community()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    with board as (
        select * from public.commit_leaderboard()
    )
    select public.community_counts((select auth.uid())) || jsonb_build_object(
        'rank', (select rank from board where profile_id = (select auth.uid())),
        'commits', (select commits from board where profile_id = (select auth.uid())),
        'ranked', (select count(*) from board)
    );
$$;

create function public.get_feed(p_from date, p_to date)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    with viewer as (
        select id, timezone from public.profiles where id = (select auth.uid())
    ),
    followed as (
        select p.id, p.handle, p.timezone
        from public.follows f
        join public.profiles p on p.id = f.profile_id and p.is_public
        join viewer v on v.id = f.user_id
    ),
    worked as (
        select fo.id as person_id, t.date, t.minutes, t.commits
        from followed fo
        cross join public.timesheet(fo.id, p_from, p_to, p_shared_only => true) as t
        where t.minutes > 0
    ),
    shared as (
        select fo.id as person_id, s.date, s.content
        from followed fo
        cross join public.shared_reports(fo.handle) as s
        where s.date between p_from and p_to
    ),
    items as (
        select
            coalesce(w.person_id, s.person_id) as person_id,
            coalesce(w.date, s.date) as date,
            null::timestamptz as at,
            md5(concat_ws(':', 'day', coalesce(w.person_id, s.person_id), coalesce(w.date, s.date))) as key,
            jsonb_build_object(
                'kind', 'day',
                'minutes', coalesce(w.minutes, 0),
                'commits', coalesce(w.commits, 0),
                'report', case when s.date is not null then jsonb_build_object(
                    'headline', s.content ->> 'headline',
                    'summary', s.content ->> 'summary'
                ) end
            ) as detail
        from worked w
        full join shared s on s.person_id = w.person_id and s.date = w.date
        union all
        select pr.user_id, pm.date, null, pm.id::text, jsonb_build_object(
            'kind', 'milestone',
            'project', jsonb_build_object('name', pr.name, 'slug', pr.slug),
            'title', pm.title,
            'detail', pm.detail
        )
        from followed fo
        join public.projects pr on pr.user_id = fo.id and pr.is_public
        cross join public.project_milestones(pr.id) as pm
        where pm.date between p_from and p_to
        union all
        select pr.user_id, (pr.created_at at time zone fo.timezone)::date, pr.created_at, pr.id::text, jsonb_build_object(
            'kind', 'project',
            'project', jsonb_build_object('name', pr.name, 'slug', pr.slug),
            'description', pr.description
        )
        from followed fo
        join public.projects pr on pr.user_id = fo.id and pr.is_public
        where (pr.created_at at time zone fo.timezone)::date between p_from and p_to
        union all
        select f.user_id, (f.created_at at time zone v.timezone)::date, f.created_at, f.id::text,
            jsonb_build_object('kind', 'follow')
        from public.follows f
        join viewer v on v.id = f.profile_id
        where (f.created_at at time zone v.timezone)::date between p_from and p_to
        union all
        select s.user_id, (s.created_at at time zone v.timezone)::date, s.created_at, s.id::text,
            jsonb_build_object('kind', 'star')
        from public.stars s
        join viewer v on v.id = s.profile_id
        where (s.created_at at time zone v.timezone)::date between p_from and p_to
        union all
        select c.user_id, (c.created_at at time zone v.timezone)::date, c.created_at, c.id::text,
            jsonb_build_object('kind', 'comment', 'body', c.body)
        from public.profile_comments c
        join viewer v on v.id = c.profile_id
        where (c.created_at at time zone v.timezone)::date between p_from and p_to
    )
    select coalesce(
        jsonb_agg(
            i.detail || jsonb_build_object(
                'key', i.key,
                'date', i.date,
                'at', i.at,
                'person', public.community_member(i.person_id)
            )
            order by i.date desc, i.at desc nulls last, i.key
        ),
        '[]'::jsonb
    )
    from items i;
$$;

revoke all on function public.commit_leaderboard() from public, anon, authenticated;
revoke all on function public.get_leaderboard(integer, integer) from public, anon;
revoke all on function public.get_feed(date, date) from public, anon;
grant execute on function public.get_leaderboard(integer, integer) to authenticated;
grant execute on function public.get_feed(date, date) to authenticated;
