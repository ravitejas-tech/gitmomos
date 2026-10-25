create type public.ai_provider as enum ('gemini', 'groq', 'claude', 'openai');

alter table public.gemini_keys rename to ai_keys;
alter table public.ai_keys rename constraint gemini_keys_pkey to ai_keys_pkey;
alter table public.ai_keys rename constraint gemini_keys_user_id_fkey to ai_keys_user_id_fkey;
alter table public.ai_keys
    add column provider public.ai_provider not null default 'gemini',
    add column report_model text not null default 'gemini-3.5-flash',
    add column chat_model text not null default 'gemini-flash-lite-latest';
alter table public.ai_keys
    alter column provider drop default,
    alter column report_model drop default,
    alter column chat_model drop default;

alter trigger gemini_keys_updated_at on public.ai_keys rename to ai_keys_updated_at;
alter trigger gemini_keys_delete_secret on public.ai_keys rename to ai_keys_delete_secret;
alter function public.delete_gemini_key_secret() rename to delete_ai_key_secret;

alter policy "Read own Gemini key" on public.ai_keys rename to "Read own AI key";
alter policy "Delete own Gemini key" on public.ai_keys rename to "Delete own AI key";

drop function public.save_gemini_key(uuid, text);
drop function public.get_gemini_key(uuid);

create function public.save_ai_key(
    p_user_id uuid,
    p_provider public.ai_provider,
    p_key text,
    p_report_model text,
    p_chat_model text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_secret_id uuid;
begin
    select secret_id into v_secret_id from public.ai_keys where user_id = p_user_id;

    if v_secret_id is null then
        v_secret_id := vault.create_secret(p_key, 'gitmomos_ai_' || p_user_id::text);
    else
        perform vault.update_secret(v_secret_id, p_key);
    end if;

    insert into public.ai_keys (user_id, provider, secret_id, hint, report_model, chat_model)
    values (p_user_id, p_provider, v_secret_id, right(p_key, 4), p_report_model, p_chat_model)
    on conflict (user_id) do update set
        provider = excluded.provider,
        hint = excluded.hint,
        report_model = excluded.report_model,
        chat_model = excluded.chat_model;
end;
$$;

create function public.get_ai_key(p_user_id uuid)
returns table (provider public.ai_provider, api_key text, report_model text, chat_model text)
language sql
stable
security definer
set search_path = ''
as $$
    select k.provider, ds.decrypted_secret, k.report_model, k.chat_model
    from public.ai_keys k
    join vault.decrypted_secrets ds on ds.id = k.secret_id
    where k.user_id = p_user_id;
$$;

create function public.match_profile_reports_by_text(
    p_user_id uuid,
    p_query text,
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
        select r.id, r.date, r.content, to_tsvector('english', r.content) as document
        from public.reports r
        where r.user_id = p_user_id
          and r.status = 'generated'
          and public.is_profile_report(p_user_id, r.content)
    ),
    question as (
        select replace(plainto_tsquery('english', p_query)::text, ' & ', ' | ')::tsquery as terms
    ),
    closest as (
        select s.id
        from shown s
        cross join question q
        where s.document @@ q.terms
        order by ts_rank(s.document, q.terms) desc, s.date desc
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
        'can_ask', exists (select 1 from public.ai_keys k where k.user_id = o.id),
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

revoke all on function public.save_ai_key(uuid, public.ai_provider, text, text, text) from public, anon, authenticated;
revoke all on function public.get_ai_key(uuid) from public, anon, authenticated;
revoke all on function public.match_profile_reports_by_text(uuid, text, integer, integer) from public, anon, authenticated;
grant execute on function public.save_ai_key(uuid, public.ai_provider, text, text, text) to service_role;
grant execute on function public.get_ai_key(uuid) to service_role;
grant execute on function public.match_profile_reports_by_text(uuid, text, integer, integer) to service_role;
