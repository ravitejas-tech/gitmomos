create type public.community_relation as enum ('followers', 'following', 'stargazers');

create table public.follows (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    profile_id uuid not null references public.profiles (id) on delete cascade,
    created_at timestamptz not null default now(),
    unique (user_id, profile_id),
    check (user_id <> profile_id)
);

create table public.stars (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    profile_id uuid not null references public.profiles (id) on delete cascade,
    created_at timestamptz not null default now(),
    unique (user_id, profile_id),
    check (user_id <> profile_id)
);

create table public.profile_comments (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references public.profiles (id) on delete cascade,
    profile_id uuid not null references public.profiles (id) on delete cascade,
    body text not null check (char_length(body) between 1 and 1000),
    reply text check (char_length(reply) between 1 and 1000),
    replied_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (user_id, profile_id),
    check (user_id <> profile_id)
);

create index follows_profile_idx on public.follows (profile_id);
create index stars_profile_idx on public.stars (profile_id);
create index profile_comments_profile_idx on public.profile_comments (profile_id, created_at desc);

create trigger profile_comments_updated_at before update on public.profile_comments
    for each row execute function public.set_updated_at();

alter table public.follows enable row level security;
alter table public.stars enable row level security;
alter table public.profile_comments enable row level security;

revoke all on public.follows from anon, authenticated;
revoke all on public.stars from anon, authenticated;
revoke all on public.profile_comments from anon, authenticated;

create function public.public_profile_id(p_handle text)
returns uuid
language sql
stable
set search_path = ''
as $$
    select id from public.profiles where handle = lower(p_handle) and is_public;
$$;

create function public.community_member(p_profile_id uuid)
returns jsonb
language sql
stable
set search_path = ''
as $$
    select jsonb_build_object(
        'name', coalesce(nullif(btrim(p.full_name), ''), case when p.is_public then p.handle end),
        'handle', case when p.is_public then p.handle end,
        'tagline', case when p.is_public then p.tagline end,
        'avatar_path', p.avatar_path,
        'is_following', exists (
            select 1 from public.follows f where f.user_id = (select auth.uid()) and f.profile_id = p.id
        ),
        'is_self', p.id is not distinct from (select auth.uid())
    )
    from public.profiles p
    where p.id = p_profile_id;
$$;

create function public.community_counts(p_profile_id uuid)
returns jsonb
language sql
stable
set search_path = ''
as $$
    select jsonb_build_object(
        'followers', (select count(*) from public.follows where profile_id = p_profile_id),
        'following', (
            select count(*)
            from public.follows f
            join public.profiles p on p.id = f.profile_id
            where f.user_id = p_profile_id and p.is_public
        ),
        'stars', (select count(*) from public.stars where profile_id = p_profile_id),
        'comments', (select count(*) from public.profile_comments where profile_id = p_profile_id)
    );
$$;

create function public.comment_page(p_profile_id uuid, p_limit integer, p_offset integer)
returns jsonb
language sql
stable
set search_path = ''
as $$
    select jsonb_build_object(
        'total', (select count(*) from public.profile_comments where profile_id = p_profile_id),
        'comments', coalesce(
            (
                select jsonb_agg(
                    jsonb_build_object(
                        'id', c.id,
                        'body', c.body,
                        'reply', c.reply,
                        'created_at', c.created_at,
                        'replied_at', c.replied_at,
                        'author', public.community_member(c.user_id)
                    )
                    order by c.created_at desc
                )
                from (
                    select *
                    from public.profile_comments
                    where profile_id = p_profile_id
                    order by created_at desc
                    limit least(greatest(p_limit, 1), 50)
                    offset greatest(p_offset, 0)
                ) as c
            ),
            '[]'::jsonb
        )
    );
$$;

create function public.get_profile_community(p_handle text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select public.community_counts(p.id) || jsonb_build_object(
        'is_owner', p.id is not distinct from (select auth.uid()),
        'is_following', exists (
            select 1 from public.follows f where f.user_id = (select auth.uid()) and f.profile_id = p.id
        ),
        'is_starred', exists (
            select 1 from public.stars s where s.user_id = (select auth.uid()) and s.profile_id = p.id
        ),
        'my_comment', (
            select c.body from public.profile_comments c where c.user_id = (select auth.uid()) and c.profile_id = p.id
        )
    )
    from public.profiles p
    where p.handle = lower(p_handle) and p.is_public;
$$;

create function public.get_profile_comments(p_handle text, p_limit integer default 10, p_offset integer default 0)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select public.comment_page(p.id, p_limit, p_offset)
    from public.profiles p
    where p.handle = lower(p_handle) and p.is_public;
$$;

create function public.get_community()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select public.community_counts((select auth.uid()));
$$;

create function public.get_received_comments(p_limit integer default 10, p_offset integer default 0)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select public.comment_page((select auth.uid()), p_limit, p_offset);
$$;

create function public.get_people(p_relation public.community_relation)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    with people as (
        select f.user_id as person_id, f.created_at
        from public.follows f
        where p_relation = 'followers' and f.profile_id = (select auth.uid())
        union all
        select f.profile_id, f.created_at
        from public.follows f
        join public.profiles p on p.id = f.profile_id and p.is_public
        where p_relation = 'following' and f.user_id = (select auth.uid())
        union all
        select s.user_id, s.created_at
        from public.stars s
        where p_relation = 'stargazers' and s.profile_id = (select auth.uid())
    )
    select coalesce(
        jsonb_agg(
            public.community_member(latest.person_id) || jsonb_build_object('since', latest.created_at)
            order by latest.created_at desc
        ),
        '[]'::jsonb
    )
    from (select * from people order by created_at desc limit 200) as latest;
$$;

create function public.search_profiles(p_query text default '', p_limit integer default 20)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    with term as (
        select btrim(coalesce(p_query, '')) as text
    ),
    found as (
        select
            p.id,
            p.handle,
            (select count(*) from public.follows f where f.profile_id = p.id) as followers,
            (select count(*) from public.stars s where s.profile_id = p.id) as stars,
            case when p.handle = lower(t.text) then 0 when p.handle like lower(t.text) || '%' then 1 else 2 end as rank
        from public.profiles p
        cross join term t
        where p.is_public
          and (
              t.text = ''
              or p.handle ilike '%' || t.text || '%'
              or p.full_name ilike '%' || t.text || '%'
              or p.tagline ilike '%' || t.text || '%'
          )
        order by rank, stars desc, followers desc, p.handle
        limit least(greatest(p_limit, 1), 50)
    )
    select coalesce(
        jsonb_agg(
            public.community_member(f.id) || jsonb_build_object('followers', f.followers, 'stars', f.stars)
            order by f.rank, f.stars desc, f.followers desc, f.handle
        ),
        '[]'::jsonb
    )
    from found f;
$$;

create function public.set_follow(p_handle text, p_following boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_user_id uuid := (select auth.uid());
    v_profile_id uuid := public.public_profile_id(p_handle);
begin
    if not p_following then
        delete from public.follows f
        using public.profiles p
        where f.user_id = v_user_id and f.profile_id = p.id and p.handle = lower(p_handle);
        return;
    end if;

    if v_profile_id is null then
        raise exception 'This profile isn’t public' using errcode = 'P0002';
    end if;
    if v_profile_id = v_user_id then
        raise exception 'You can’t follow yourself' using errcode = '22023';
    end if;

    insert into public.follows (user_id, profile_id)
    values (v_user_id, v_profile_id)
    on conflict (user_id, profile_id) do nothing;
end;
$$;

create function public.set_star(p_handle text, p_starred boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_user_id uuid := (select auth.uid());
    v_profile_id uuid := public.public_profile_id(p_handle);
begin
    if not p_starred then
        delete from public.stars s
        using public.profiles p
        where s.user_id = v_user_id and s.profile_id = p.id and p.handle = lower(p_handle);
        return;
    end if;

    if v_profile_id is null then
        raise exception 'This profile isn’t public' using errcode = 'P0002';
    end if;
    if v_profile_id = v_user_id then
        raise exception 'You can’t star your own profile' using errcode = '22023';
    end if;

    insert into public.stars (user_id, profile_id)
    values (v_user_id, v_profile_id)
    on conflict (user_id, profile_id) do nothing;
end;
$$;

create function public.save_profile_comment(p_handle text, p_body text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_user_id uuid := (select auth.uid());
    v_profile_id uuid := public.public_profile_id(p_handle);
begin
    if v_profile_id is null then
        raise exception 'This profile isn’t public' using errcode = 'P0002';
    end if;
    if v_profile_id = v_user_id then
        raise exception 'You can’t comment on your own profile' using errcode = '22023';
    end if;

    insert into public.profile_comments (user_id, profile_id, body)
    values (v_user_id, v_profile_id, btrim(p_body))
    on conflict (user_id, profile_id) do update set body = excluded.body;
end;
$$;

create function public.delete_profile_comment(p_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
    delete from public.profile_comments
    where id = p_id
      and (user_id = (select auth.uid()) or profile_id = (select auth.uid()));

    if not found then
        raise exception 'Comment not found' using errcode = 'P0002';
    end if;
end;
$$;

create function public.reply_to_profile_comment(p_id uuid, p_reply text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
    update public.profile_comments
    set reply = nullif(btrim(p_reply), ''),
        replied_at = case when nullif(btrim(p_reply), '') is null then null else now() end
    where id = p_id and profile_id = (select auth.uid());

    if not found then
        raise exception 'Comment not found' using errcode = 'P0002';
    end if;
end;
$$;

revoke all on function public.public_profile_id(text) from public, anon, authenticated;
revoke all on function public.community_member(uuid) from public, anon, authenticated;
revoke all on function public.community_counts(uuid) from public, anon, authenticated;
revoke all on function public.comment_page(uuid, integer, integer) from public, anon, authenticated;
revoke all on function public.get_profile_community(text) from public;
revoke all on function public.get_profile_comments(text, integer, integer) from public;
revoke all on function public.get_community() from public, anon;
revoke all on function public.get_received_comments(integer, integer) from public, anon;
revoke all on function public.get_people(public.community_relation) from public, anon;
revoke all on function public.search_profiles(text, integer) from public, anon;
revoke all on function public.set_follow(text, boolean) from public, anon;
revoke all on function public.set_star(text, boolean) from public, anon;
revoke all on function public.save_profile_comment(text, text) from public, anon;
revoke all on function public.delete_profile_comment(uuid) from public, anon;
revoke all on function public.reply_to_profile_comment(uuid, text) from public, anon;
grant execute on function public.get_profile_community(text) to anon, authenticated;
grant execute on function public.get_profile_comments(text, integer, integer) to anon, authenticated;
grant execute on function public.get_community() to authenticated;
grant execute on function public.get_received_comments(integer, integer) to authenticated;
grant execute on function public.get_people(public.community_relation) to authenticated;
grant execute on function public.search_profiles(text, integer) to authenticated;
grant execute on function public.set_follow(text, boolean) to authenticated;
grant execute on function public.set_star(text, boolean) to authenticated;
grant execute on function public.save_profile_comment(text, text) to authenticated;
grant execute on function public.delete_profile_comment(uuid) to authenticated;
grant execute on function public.reply_to_profile_comment(uuid, text) to authenticated;
