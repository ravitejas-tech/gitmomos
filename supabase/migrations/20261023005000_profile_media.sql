alter table public.profiles
    add column avatar_path text,
    add column banner_path text,
    add constraint profiles_avatar_path_owned check (avatar_path like id::text || '/%'),
    add constraint profiles_banner_path_owned check (banner_path like id::text || '/%');

grant update (avatar_path, banner_path) on public.profiles to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('profile-media', 'profile-media', true, 2097152, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do nothing;

create policy "Read own profile media" on storage.objects
    for select to authenticated
    using (bucket_id = 'profile-media' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Upload own profile media" on storage.objects
    for insert to authenticated
    with check (bucket_id = 'profile-media' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Delete own profile media" on storage.objects
    for delete to authenticated
    using (bucket_id = 'profile-media' and (storage.foldername(name))[1] = (select auth.uid())::text);
