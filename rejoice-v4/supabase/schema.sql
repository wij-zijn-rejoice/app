-- Rejoice v4 — run this once in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  email text,
  created_at timestamptz default now()
);

create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client_name text,
  event_date date not null,
  start_time time,
  end_time time,
  location text,
  fee numeric(10,2) default 0,
  status text default 'Optie',
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table if not exists public.finance_transactions (
  id uuid primary key default gen_random_uuid(),
  description text not null,
  amount numeric(10,2) not null,
  transaction_date date not null default current_date,
  category text default 'Overig',
  type text not null check (type in ('income','expense')),
  paid_by uuid references public.profiles(id),
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text default 'Overig',
  storage_path text not null,
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  owner_id uuid references public.profiles(id),
  photo_path text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.calendar_events enable row level security;
alter table public.bookings enable row level security;
alter table public.finance_transactions enable row level security;
alter table public.documents enable row level security;
alter table public.inventory enable row level security;

-- Policies are added safely if they don't exist yet.
do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='band members profiles') then
    create policy "band members profiles" on public.profiles for all to authenticated using (true) with check (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='calendar_events' and policyname='band members calendar') then
    create policy "band members calendar" on public.calendar_events for all to authenticated using (true) with check (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='bookings' and policyname='band members bookings') then
    create policy "band members bookings" on public.bookings for all to authenticated using (true) with check (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='finance_transactions' and policyname='band members finance') then
    create policy "band members finance" on public.finance_transactions for all to authenticated using (true) with check (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='documents' and policyname='band members documents') then
    create policy "band members documents" on public.documents for all to authenticated using (true) with check (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='inventory' and policyname='band members inventory') then
    create policy "band members inventory" on public.inventory for all to authenticated using (true) with check (true);
  end if;
end $$;

insert into storage.buckets (id,name,public) values ('documents','documents',false) on conflict (id) do nothing;
insert into storage.buckets (id,name,public) values ('inventory','inventory',false) on conflict (id) do nothing;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='rejoice documents storage') then
    create policy "rejoice documents storage" on storage.objects for all to authenticated using (bucket_id='documents') with check (bucket_id='documents');
  end if;
  if not exists (select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='rejoice inventory storage') then
    create policy "rejoice inventory storage" on storage.objects for all to authenticated using (bucket_id='inventory') with check (bucket_id='inventory');
  end if;
end $$;

-- After creating the seven Auth users, this fills their profile names.
insert into public.profiles (id,display_name,email)
select id,
case lower(email)
 when 'job@wijzijnrejoice.nl' then 'Job'
 when 'mees@wijzijnrejoice.nl' then 'Mees'
 when 'sjoerd@wijzijnrejoice.nl' then 'Sjoerd'
 when 'judith@wijzijnrejoice.nl' then 'Judith'
 when 'rein@wijzijnrejoice.nl' then 'Rein'
 when 'marielle@wijzijnrejoice.nl' then 'Mariëlle'
 when 'lans@wijzijnrejoice.nl' then 'Lans'
 else split_part(email,'@',1)
end,
email
from auth.users
where lower(email) in ('job@wijzijnrejoice.nl','mees@wijzijnrejoice.nl','sjoerd@wijzijnrejoice.nl','judith@wijzijnrejoice.nl','rein@wijzijnrejoice.nl','marielle@wijzijnrejoice.nl','lans@wijzijnrejoice.nl')
on conflict (id) do update set display_name=excluded.display_name,email=excluded.email;
