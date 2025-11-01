-- Add admin write policies for blog_posts
drop policy if exists "blog_posts_select_published" on public.blog_posts;
drop policy if exists "blog_posts_insert_admin" on public.blog_posts;
drop policy if exists "blog_posts_update_admin" on public.blog_posts;
drop policy if exists "blog_posts_delete_admin" on public.blog_posts;

-- Create new blog_posts policies
create policy "blog_posts_select_published" on public.blog_posts 
  for select using (published = true OR auth.role() = 'authenticated');

create policy "blog_posts_insert_admin" on public.blog_posts 
  for insert with check (auth.role() = 'authenticated');

create policy "blog_posts_update_admin" on public.blog_posts 
  for update using (auth.role() = 'authenticated');

create policy "blog_posts_delete_admin" on public.blog_posts 
  for delete using (auth.role() = 'authenticated');

-- Add admin write policies for program_sessions
drop policy if exists "program_sessions_select_all" on public.program_sessions;
drop policy if exists "program_sessions_insert_admin" on public.program_sessions;
drop policy if exists "program_sessions_update_admin" on public.program_sessions;
drop policy if exists "program_sessions_delete_admin" on public.program_sessions;

create policy "program_sessions_select_all" on public.program_sessions 
  for select using (true);

create policy "program_sessions_insert_admin" on public.program_sessions 
  for insert with check (auth.role() = 'authenticated');

create policy "program_sessions_update_admin" on public.program_sessions 
  for update using (auth.role() = 'authenticated');

create policy "program_sessions_delete_admin" on public.program_sessions 
  for delete using (auth.role() = 'authenticated');

-- Add approve/reject policies for mentorship and awards
drop policy if exists "mentorship_update_authenticated" on public.mentorship_applications;
drop policy if exists "award_update_authenticated" on public.award_nominations;

create policy "mentorship_update_authenticated" on public.mentorship_applications 
  for update using (auth.role() = 'authenticated');

create policy "award_update_authenticated" on public.award_nominations 
  for update using (auth.role() = 'authenticated');
