-- Add RLS policies for speakers table to allow authenticated admins to insert/update/delete
create policy "speakers_insert_authenticated" on public.speakers 
  for insert with check (auth.role() = 'authenticated');

create policy "speakers_update_authenticated" on public.speakers 
  for update using (auth.role() = 'authenticated');

create policy "speakers_delete_authenticated" on public.speakers 
  for delete using (auth.role() = 'authenticated');
