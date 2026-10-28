create or replace function public.get_community()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    with board as (
        select * from public.commit_leaderboard()
    ),
    me as (
        select rank, commits from board where profile_id = (select auth.uid())
    )
    select public.community_counts((select auth.uid())) || jsonb_build_object(
        'rank', (select rank from me),
        'commits', (select commits from me),
        'ranked', (select count(*) from board),
        'ahead', (
            select public.community_member(b.profile_id) || jsonb_build_object('commits', b.commits, 'rank', b.rank)
            from board b
            cross join me
            where b.rank < me.rank
            order by b.rank desc, b.handle
            limit 1
        )
    );
$$;

create or replace function public.get_feed(p_from date, p_to date)
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
        select fo.id as person_id, s.date, s.content, r.created_at
        from followed fo
        cross join public.shared_reports(fo.handle) as s
        join public.reports r on r.user_id = fo.id and r.date = s.date
        where s.date between p_from and p_to
    ),
    items as (
        select
            coalesce(w.person_id, s.person_id) as person_id,
            coalesce(w.date, s.date) as date,
            s.created_at as at,
            md5(concat_ws(':', 'day', coalesce(w.person_id, s.person_id), coalesce(w.date, s.date))) as key,
            jsonb_build_object(
                'kind', 'day',
                'minutes', coalesce(w.minutes, 0),
                'commits', coalesce(w.commits, 0),
                'report', case when s.date is not null then jsonb_build_object(
                    'headline', s.content ->> 'headline',
                    'summary', s.content ->> 'summary',
                    'areas', public.array_or_empty(s.content -> 'key_work_areas')
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
