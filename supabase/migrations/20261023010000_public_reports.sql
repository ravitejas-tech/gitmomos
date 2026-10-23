create or replace function public.array_or_empty(p_value jsonb)
returns jsonb
language sql
immutable
set search_path = ''
as $$
    select case when jsonb_typeof(p_value) = 'array' then p_value else '[]'::jsonb end;
$$;

create or replace function public.shared_reports(p_handle text)
returns table (date date, content jsonb)
language sql
stable
security definer
set search_path = ''
as $$
    select r.date, r.content
    from public.reports r
    join public.profiles p on p.id = r.user_id
    where p.handle = lower(p_handle)
      and p.is_public
      and r.status = 'generated'
      and public.is_profile_report(p.id, r.content);
$$;

create or replace function public.get_public_profile(p_handle text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    with owner as (
        select id, handle, full_name, tagline, avatar_path, banner_path, timezone, (now() at time zone timezone)::date as today
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
        select date, content from public.shared_reports(p_handle)
    ),
    areas as (
        select area, count(*) as reports
        from shown, jsonb_array_elements_text(public.array_or_empty(shown.content -> 'key_work_areas')) as area
        group by area
        order by reports desc, area
        limit 8
    )
    select jsonb_build_object(
        'handle', o.handle,
        'name', coalesce(nullif(btrim(o.full_name), ''), o.handle),
        'tagline', o.tagline,
        'avatar_path', o.avatar_path,
        'banner_path', o.banner_path,
        'can_ask', exists (select 1 from public.gemini_keys k where k.user_id = o.id),
        'since', (select min(date) from shown),
        'stats', jsonb_build_object(
            'commits', (select count(*) from year_commits),
            'active_days', (select count(*) from days),
            'longest_streak', coalesce((select max(length) from runs), 0),
            'projects', (select count(distinct repository_id) from year_commits),
            'reports', (select count(*) from shown)
        ),
        'shipped', coalesce(
            (
                select jsonb_agg(
                    jsonb_build_object(
                        'date', top.date,
                        'title', top.content -> 'highlights' -> 0 ->> 'title',
                        'detail', top.content -> 'highlights' -> 0 ->> 'detail',
                        'area', top.content -> 'key_work_areas' ->> 0
                    )
                    order by top.date desc
                )
                from (
                    select date, content
                    from shown
                    where jsonb_array_length(public.array_or_empty(content -> 'highlights')) > 0
                    order by date desc
                    limit 6
                ) as top
            ),
            '[]'::jsonb
        ),
        'areas', coalesce(
            (select jsonb_agg(jsonb_build_object('name', area, 'reports', reports) order by reports desc, area) from areas),
            '[]'::jsonb
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

create or replace function public.search_public_reports(
    p_handle text,
    p_query text default '',
    p_from date default null,
    p_to date default null,
    p_limit integer default 10,
    p_offset integer default 0
)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    with documents as (
        select s.date, s.content, concat_ws(
            ' ',
            to_char(s.date, 'YYYY-MM-DD FMMonth FMDD FMDay'),
            s.content ->> 'headline',
            s.content ->> 'summary',
            (
                select string_agg(concat_ws(' ', h ->> 'title', h ->> 'detail'), ' ')
                from jsonb_array_elements(public.array_or_empty(s.content -> 'highlights')) as h
            ),
            (
                select string_agg(area, ' ')
                from jsonb_array_elements_text(public.array_or_empty(s.content -> 'key_work_areas')) as area
            )
        ) as body
        from public.shared_reports(p_handle) s
        where (p_from is null or s.date >= p_from)
          and (p_to is null or s.date <= p_to)
    ),
    matched as (
        select d.date, d.content
        from documents d
        where nullif(btrim(p_query), '') is null
           or to_tsvector('english', d.body) @@ websearch_to_tsquery('english', p_query)
           or d.body ilike '%' || btrim(p_query) || '%'
    )
    select jsonb_build_object(
        'name', coalesce(nullif(btrim(p.full_name), ''), p.handle),
        'total', (select count(*) from matched),
        'reports', coalesce(
            (
                select jsonb_agg(
                    jsonb_build_object(
                        'date', page.date,
                        'headline', page.content ->> 'headline',
                        'summary', page.content ->> 'summary',
                        'highlights', public.array_or_empty(page.content -> 'highlights'),
                        'key_work_areas', public.array_or_empty(page.content -> 'key_work_areas')
                    )
                    order by page.date desc
                )
                from (
                    select date, content
                    from matched
                    order by date desc
                    limit least(greatest(p_limit, 1), 50)
                    offset greatest(p_offset, 0)
                ) as page
            ),
            '[]'::jsonb
        )
    )
    from public.profiles p
    where p.handle = lower(p_handle) and p.is_public;
$$;

create or replace function public.get_public_report(p_handle text, p_date date)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    with shown as (
        select date, content from public.shared_reports(p_handle)
    )
    select jsonb_build_object(
        'handle', p.handle,
        'name', coalesce(nullif(btrim(p.full_name), ''), p.handle),
        'date', s.date,
        'headline', s.content ->> 'headline',
        'summary', s.content ->> 'summary',
        'highlights', public.array_or_empty(s.content -> 'highlights'),
        'key_work_areas', public.array_or_empty(s.content -> 'key_work_areas'),
        'previous', (select max(date) from shown where date < p_date),
        'next', (select min(date) from shown where date > p_date)
    )
    from shown s
    join public.profiles p on p.handle = lower(p_handle)
    where s.date = p_date;
$$;

revoke all on function public.array_or_empty(jsonb) from public, anon, authenticated;
revoke all on function public.shared_reports(text) from public, anon, authenticated;
revoke all on function public.search_public_reports(text, text, date, date, integer, integer) from public;
revoke all on function public.get_public_report(text, date) from public;
grant execute on function public.search_public_reports(text, text, date, date, integer, integer) to anon, authenticated;
grant execute on function public.get_public_report(text, date) to anon, authenticated;
