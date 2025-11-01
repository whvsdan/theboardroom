-- Update RLS policies to allow admin operations
-- First, drop existing restrictive policies
drop policy if exists "registrations_select_own" on public.registrations;
drop policy if exists "registrations_insert_own" on public.registrations;
drop policy if exists "registrations_update_own" on public.registrations;

drop policy if exists "mentorship_select_own" on public.mentorship_applications;
drop policy if exists "mentorship_insert_own" on public.mentorship_applications;
drop policy if exists "mentorship_update_own" on public.mentorship_applications;

-- Create new policies that allow authenticated users to perform admin operations
-- Registrations policies
create policy "registrations_select_all_authenticated" on public.registrations 
  for select using (auth.role() = 'authenticated');

create policy "registrations_insert_authenticated" on public.registrations 
  for insert with check (auth.role() = 'authenticated');

create policy "registrations_update_authenticated" on public.registrations 
  for update using (auth.role() = 'authenticated');

create policy "registrations_delete_authenticated" on public.registrations 
  for delete using (auth.role() = 'authenticated');

-- Mentorship applications policies
create policy "mentorship_select_all_authenticated" on public.mentorship_applications 
  for select using (auth.role() = 'authenticated');

create policy "mentorship_insert_authenticated" on public.mentorship_applications 
  for insert with check (auth.role() = 'authenticated');

create policy "mentorship_update_authenticated" on public.mentorship_applications 
  for update using (auth.role() = 'authenticated');

create policy "mentorship_delete_authenticated" on public.mentorship_applications 
  for delete using (auth.role() = 'authenticated');
