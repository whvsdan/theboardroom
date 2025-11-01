-- Drop the restrictive authenticated-only policy for mentorship applications
drop policy if exists "mentorship_insert_authenticated" on public.mentorship_applications;
drop policy if exists "mentorship_select_all_authenticated" on public.mentorship_applications;
drop policy if exists "mentorship_update_authenticated" on public.mentorship_applications;
drop policy if exists "mentorship_delete_authenticated" on public.mentorship_applications;

-- Create new policies that allow anyone to submit (like award_nominations and contact_messages)
create policy "mentorship_insert_all" on public.mentorship_applications 
  for insert with check (true);

create policy "mentorship_select_all" on public.mentorship_applications 
  for select using (true);
