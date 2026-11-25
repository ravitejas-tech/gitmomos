alter table public.profiles add column onboarded_at timestamptz;

update public.profiles p
set onboarded_at = now()
where exists (select 1 from public.connections c where c.user_id = p.id);

grant update (onboarded_at) on public.profiles to authenticated;
