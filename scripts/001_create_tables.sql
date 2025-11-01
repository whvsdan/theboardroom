-- Create profiles table for user management
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  company text,
  job_title text,
  bio text,
  avatar_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create speakers table
create table if not exists public.speakers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  company text,
  bio text,
  image_url text,
  email text,
  social_links jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create program/schedule table
create table if not exists public.program_sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  speaker_id uuid references public.speakers(id),
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  location text,
  session_type text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create registrations table
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  company text,
  job_title text,
  dietary_restrictions text,
  ticket_type text,
  status text default 'pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create mentorship applications table
create table if not exists public.mentorship_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  company text,
  experience_level text,
  mentorship_focus text,
  bio text,
  status text default 'pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create awards/nominations table
create table if not exists public.award_nominations (
  id uuid primary key default gen_random_uuid(),
  nominee_name text not null,
  nominee_email text,
  nominator_name text not null,
  nominator_email text not null,
  category text not null,
  reason text,
  status text default 'pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create sponsors table
create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website text,
  tier text,
  description text,
  contact_email text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create gallery images table
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  description text,
  event_year text,
  created_at timestamp with time zone default now()
);

-- Create blog posts table
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  author_id uuid references public.profiles(id),
  featured_image_url text,
  published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create testimonials table
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_title text,
  author_company text,
  author_image_url text,
  content text not null,
  rating integer,
  featured boolean default false,
  created_at timestamp with time zone default now()
);

-- Create contact messages table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'new',
  created_at timestamp with time zone default now()
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.speakers enable row level security;
alter table public.program_sessions enable row level security;
alter table public.registrations enable row level security;
alter table public.mentorship_applications enable row level security;
alter table public.award_nominations enable row level security;
alter table public.sponsors enable row level security;
alter table public.gallery_images enable row level security;
alter table public.blog_posts enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_messages enable row level security;

-- RLS Policies for profiles
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- RLS Policies for public read tables (speakers, sponsors, gallery, testimonials)
create policy "speakers_select_all" on public.speakers for select using (true);
create policy "program_sessions_select_all" on public.program_sessions for select using (true);
create policy "sponsors_select_all" on public.sponsors for select using (true);
create policy "gallery_images_select_all" on public.gallery_images for select using (true);
create policy "blog_posts_select_published" on public.blog_posts for select using (published = true);
create policy "testimonials_select_all" on public.testimonials for select using (true);

-- RLS Policies for registrations (users can see their own)
create policy "registrations_select_own" on public.registrations for select using (auth.uid() = user_id);
create policy "registrations_insert_own" on public.registrations for insert with check (auth.uid() = user_id);
create policy "registrations_update_own" on public.registrations for update using (auth.uid() = user_id);

-- RLS Policies for mentorship applications
create policy "mentorship_select_own" on public.mentorship_applications for select using (auth.uid() = user_id);
create policy "mentorship_insert_own" on public.mentorship_applications for insert with check (auth.uid() = user_id);
create policy "mentorship_update_own" on public.mentorship_applications for update using (auth.uid() = user_id);

-- RLS Policies for award nominations (anyone can submit)
create policy "awards_insert_all" on public.award_nominations for insert with check (true);
create policy "awards_select_all" on public.award_nominations for select using (true);

-- RLS Policies for contact messages (anyone can submit)
create policy "contact_insert_all" on public.contact_messages for insert with check (true);
