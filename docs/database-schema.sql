-- INHIM Trading Store schema blueprint
-- Run in Supabase SQL editor or any Postgres-compatible environment

create extension if not exists "uuid-ossp";

-- Core identities
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null check (role in ('customer','vendor','admin')) default 'customer',
  display_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists vendor_applications (
  id uuid primary key default uuid_generate_v4(),
  business_name text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  whatsapp text not null,
  social_handle text,
  location text not null,
  business_address text not null,
  business_description text not null,
  store_description text not null,
  operating_hours text not null,
  delivery_rules text not null,
  delivery_fee text not null,
  shopping_methods jsonb not null default '[]'::jsonb,
  payout_method text not null,
  cipc_registered boolean not null default false,
  company_reg_number text,
  tax_number text,
  id_number text not null,
  logo_file_name text,
  store_banner_file_name text,
  id_document_file_name text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists vendors (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id),
  application_id uuid references vendor_applications(id),
  business_name text not null,
  status text not null default 'pending',
  commission_rate numeric(5,2) not null default 12.0,
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  vendor_id uuid references vendors(id) on delete cascade,
  name text not null,
  category text not null,
  description text,
  price numeric(12,2) not null,
  status text not null default 'draft',
  media_url text,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references profiles(id),
  vendor_id uuid references vendors(id),
  total numeric(12,2) not null,
  commission numeric(12,2) not null default 0,
  status text not null default 'pending',
  placed_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity integer not null default 1,
  unit_price numeric(12,2) not null
);

create table if not exists carts (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  status text not null default 'active',
  updated_at timestamptz not null default now()
);

create table if not exists cart_items (
  id uuid primary key default uuid_generate_v4(),
  cart_id uuid references carts(id) on delete cascade,
  product_id uuid references products(id),
  quantity integer not null default 1,
  unique(cart_id, product_id)
);

create table if not exists wishlists (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists wishlist_items (
  id uuid primary key default uuid_generate_v4(),
  wishlist_id uuid references wishlists(id) on delete cascade,
  product_id uuid references products(id),
  unique(wishlist_id, product_id)
);

create table if not exists cipc_registration_requests (
  id uuid primary key default uuid_generate_v4(),
  applicant_name text not null,
  applicant_email text not null,
  applicant_phone text not null,
  business_structure text not null,
  name_option_one text not null,
  name_option_two text,
  directors jsonb not null,
  address text not null,
  id_document_path text,
  proof_of_address_path text,
  additional_notes text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Storage buckets (create via Supabase storage UI)
-- vendor-media (folders: logos, banners)
-- vendor-documents (folders: ids)
-- registration-documents (folders: ids, proof)

-- Policies and helper views should ensure users only access rows tied to their profile_id.
