-- AntGRP careers portal schema. Run once in the Supabase SQL editor.
-- (Dashboard -> SQL Editor -> New query -> paste -> Run)

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  location text not null,
  employment_type text not null,
  experience_level text not null,
  description text not null,
  requirements text not null,
  salary_range text,
  status text not null default 'draft' check (status in ('draft','published','closed')),
  posted_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  name text not null,
  email text not null,
  phone text not null,
  linkedin text,
  work_authorization text not null,
  resume_filename text not null,
  resume_path text not null,
  status text not null default 'new' check (status in ('new','reviewed','contacted','rejected')),
  created_at timestamptz not null default now()
);

create index if not exists applications_job_id_idx on applications(job_id);

-- The site accesses these tables with the service-role key only (server
-- side). Enable RLS with no public policies so anon keys can read nothing.
alter table jobs enable row level security;
alter table applications enable row level security;

-- Private storage bucket for resumes (5 MB limit enforced app-side too).
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

-- Upgrading from v4? Run:  alter table jobs add column if not exists posted_by text;
