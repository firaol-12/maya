-- Maya: products table
-- Run this in your Supabase SQL editor or via `supabase db push`

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  description text not null default '',
  price       numeric(10, 2) not null check (price >= 0),
  category    text not null,
  image_url   text not null default '',
  model_url   text,
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security (read-only for anonymous users)
alter table public.products enable row level security;

create policy "Anyone can read products"
  on public.products
  for select
  using (true);

-- Index on slug for fast product page lookups
create index if not exists products_slug_idx on public.products (slug);

-- Index on category for filtered catalog queries
create index if not exists products_category_idx on public.products (category);
