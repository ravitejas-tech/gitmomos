create or replace function public.timesheet(p_user_id uuid, p_from date, p_to date, p_shared_only boolean)
returns jsonb
language sql
stable
set search_path = ''
as $$
    with rules as (
        select interval '2 hours' as session_break, interval '30 minutes' as session_lead
    ),
    owner as (
        select timezone from public.profiles where id = p_user_id
    ),
    stamps as (
        select (c.committed_at at time zone o.timezone)::date as day, c.committed_at
        from public.commits c
        join public.repositories r on r.id = c.repository_id
        cross join owner o
        where c.user_id = p_user_id
          and c.committed_at >= (p_from::timestamp at time zone o.timezone)
          and c.committed_at < ((p_to + 1)::timestamp at time zone o.timezone)
          and (not p_shared_only or (r.enabled and r.on_profile))
    ),
    gaps as (
        select day, committed_at - lag(committed_at) over (partition by day order by committed_at) as gap
        from stamps
    ),
    days as (
        select
            g.day,
            count(*) as commits,
            round(extract(epoch from sum(
                case when g.gap is null or g.gap > r.session_break then r.session_lead else g.gap end
            )) / 60) as minutes
        from gaps g
        cross join rules r
        group by g.day
    )
    select coalesce(
        jsonb_agg(jsonb_build_object('date', day, 'minutes', minutes, 'commits', commits) order by day),
        '[]'::jsonb
    )
    from days;
$$;

create or replace function public.get_timesheet(p_from date, p_to date)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select public.timesheet((select auth.uid()), p_from, p_to, p_shared_only => false);
$$;

create or replace function public.get_public_timesheet(p_handle text, p_from date, p_to date)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select public.timesheet(p.id, p_from, p_to, p_shared_only => true)
    from public.profiles p
    where p.handle = lower(p_handle) and p.is_public;
$$;

revoke all on function public.timesheet(uuid, date, date, boolean) from public, anon, authenticated;
revoke all on function public.get_timesheet(date, date) from public, anon;
revoke all on function public.get_public_timesheet(text, date, date) from public;
grant execute on function public.get_timesheet(date, date) to authenticated;
grant execute on function public.get_public_timesheet(text, date, date) to anon, authenticated;
