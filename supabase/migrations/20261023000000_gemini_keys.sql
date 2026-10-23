create table public.gemini_keys (
    user_id uuid primary key references public.profiles (id) on delete cascade,
    secret_id uuid not null,
    hint text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create trigger gemini_keys_updated_at before update on public.gemini_keys
    for each row execute function public.set_updated_at();

alter table public.gemini_keys enable row level security;

create policy "Read own Gemini key" on public.gemini_keys
    for select to authenticated using ((select auth.uid()) = user_id);
create policy "Delete own Gemini key" on public.gemini_keys
    for delete to authenticated using ((select auth.uid()) = user_id);

revoke insert, update on public.gemini_keys from anon, authenticated;

create or replace function public.save_gemini_key(p_user_id uuid, p_key text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    v_secret_id uuid;
begin
    select secret_id into v_secret_id from public.gemini_keys where user_id = p_user_id;

    if v_secret_id is null then
        v_secret_id := vault.create_secret(p_key, 'gitmomos_gemini_' || p_user_id::text);
    else
        perform vault.update_secret(v_secret_id, p_key);
    end if;

    insert into public.gemini_keys (user_id, secret_id, hint)
    values (p_user_id, v_secret_id, right(p_key, 4))
    on conflict (user_id) do update set hint = excluded.hint;
end;
$$;

create or replace function public.get_gemini_key(p_user_id uuid)
returns text
language sql
stable
security definer
set search_path = ''
as $$
    select ds.decrypted_secret
    from vault.decrypted_secrets ds
    join public.gemini_keys k on k.secret_id = ds.id
    where k.user_id = p_user_id;
$$;

create or replace function public.delete_gemini_key_secret()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    delete from vault.secrets where id = old.secret_id;
    return old;
end;
$$;

create trigger gemini_keys_delete_secret
    after delete on public.gemini_keys
    for each row execute function public.delete_gemini_key_secret();

revoke all on function public.save_gemini_key(uuid, text) from public, anon, authenticated;
revoke all on function public.get_gemini_key(uuid) from public, anon, authenticated;
revoke all on function public.delete_gemini_key_secret() from public, anon, authenticated;
grant execute on function public.save_gemini_key(uuid, text) to service_role;
grant execute on function public.get_gemini_key(uuid) to service_role;
