-- ScaleFlow AI production data layer
-- Run in the Supabase SQL editor after creating the project.
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  service text,
  message text not null,
  status text not null default 'new' check (status in ('new','contacted','qualified','won','lost')),
  created_at timestamptz not null default now()
);

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('page','service','case_study','testimonial','article')),
  title text not null,
  slug text unique,
  excerpt text,
  body text,
  image_url text,
  published boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.leads enable row level security;
alter table public.content_items enable row level security;

create policy "authenticated admins can manage leads" on public.leads for all to authenticated using (true) with check (true);
create policy "public can create leads" on public.leads for insert to anon, authenticated with check (true);
create policy "authenticated admins can manage content" on public.content_items for all to authenticated using (true) with check (true);
create policy "public can read published content" on public.content_items for select to anon, authenticated using (published = true);

create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_status_idx on public.leads(status);
create index if not exists content_type_idx on public.content_items(type);
