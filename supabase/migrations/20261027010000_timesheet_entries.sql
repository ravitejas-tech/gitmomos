create table public.timesheet_entries (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    date date not null,
    minutes integer not null check (minutes between 0 and 1440),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (user_id, date)
);

create trigger timesheet_entries_updated_at before update on public.timesheet_entries
    for each row execute function public.set_updated_at();

alter table public.timesheet_entries enable row level security;
revoke all on public.timesheet_entries from anon, authenticated;

drop function public.timesheet(uuid, date, date, boolean);

create function public.timesheet(p_user_id uuid, p_from date, p_to date, p_shared_only boolean)
returns table (date date, minutes integer, estimated integer, commits integer, edited boolean)
language sql
stable
set search_path = ''
as $$
    with rules as (
        select interval '3 hours 30 minutes' as session_break, interval '30 minutes' as session_lead
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
    sessions as (
        select
            g.day,
            count(*)::integer as commits,
            round(extract(epoch from sum(
                case when g.gap is null or g.gap > r.session_break then r.session_lead else g.gap end
            )) / 60)::integer as minutes
        from gaps g
        cross join rules r
        group by g.day
    ),
    entries as (
        select e.date, e.minutes
        from public.timesheet_entries e
        where e.user_id = p_user_id
          and e.date between p_from and p_to
    )
    select
        coalesce(e.date, s.day),
        coalesce(e.minutes, s.minutes),
        coalesce(s.minutes, 0),
        coalesce(s.commits, 0),
        e.date is not null
    from sessions s
    full join entries e on e.date = s.day;
$$;

create or replace function public.get_timesheet(p_from date, p_to date)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select coalesce(
        jsonb_agg(
            jsonb_build_object(
                'date', t.date,
                'minutes', t.minutes,
                'estimated', t.estimated,
                'commits', t.commits,
                'edited', t.edited
            )
            order by t.date
        ),
        '[]'::jsonb
    )
    from public.timesheet((select auth.uid()), p_from, p_to, p_shared_only => false) t;
$$;

create or replace function public.get_public_timesheet(p_handle text, p_from date, p_to date)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select (
        select coalesce(
            jsonb_agg(
                jsonb_build_object('date', t.date, 'minutes', t.minutes, 'commits', t.commits, 'edited', t.edited)
                order by t.date
            ),
            '[]'::jsonb
        )
        from public.timesheet(p.id, p_from, p_to, p_shared_only => true) t
    )
    from public.profiles p
    where p.handle = lower(p_handle) and p.is_public;
$$;

create function public.set_timesheet_entry(p_date date, p_minutes integer default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_user_id uuid := (select auth.uid());
begin
    if p_date > (select (now() at time zone p.timezone)::date from public.profiles p where p.id = v_user_id) then
        raise exception 'Hours can only be set for today or earlier' using errcode = '22023';
    end if;

    if p_minutes is null then
        delete from public.timesheet_entries where user_id = v_user_id and date = p_date;
    else
        insert into public.timesheet_entries (user_id, date, minutes)
        values (v_user_id, p_date, p_minutes)
        on conflict (user_id, date) do update set minutes = excluded.minutes;
    end if;
end;
$$;

revoke all on function public.timesheet(uuid, date, date, boolean) from public, anon, authenticated;
revoke all on function public.set_timesheet_entry(date, integer) from public, anon;
grant execute on function public.set_timesheet_entry(date, integer) to authenticated;
