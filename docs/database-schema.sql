-- INHIM Trading Store schema blueprint (enterprise edition)
-- Run inside the Supabase SQL editor or any Postgres-compatible environment

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

--------------------------------------------------------------------------------
-- 1. Core identities & RBAC (Users requirement)
--------------------------------------------------------------------------------

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null check (role in ('customer','vendor','admin')) default 'customer',
  display_name text,
  phone text,
  preferred_locale text default 'en-ZA',
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists user_addresses (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  label text not null default 'primary',
  contact_name text,
  phone text,
  line1 text not null,
  line2 text,
  city text not null,
  province text,
  postal_code text,
  country_code text not null default 'ZA',
  address_type text not null default 'shipping',
  is_default boolean not null default false,
  created_at timestamptz not null default now()
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
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

--------------------------------------------------------------------------------
-- 2. Catalog, taxonomy, and media (Products, Categories requirements)
--------------------------------------------------------------------------------

create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  vendor_id uuid references vendors(id) on delete cascade,
  sku text unique,
  slug text unique,
  name text not null,
  summary text,
  description text,
  base_price numeric(12,2) not null,
  currency text not null default 'ZAR',
  status text not null default 'draft',
  attributes jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  parent_id uuid references categories(id) on delete set null,
  slug text unique not null,
  name text not null,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists product_category_map (
  product_id uuid references products(id) on delete cascade,
  category_id uuid references categories(id) on delete cascade,
  primary key (product_id, category_id)
);

create table if not exists product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references products(id) on delete cascade,
  variant_sku text unique,
  title text,
  attributes jsonb not null default '{}'::jsonb,
  price numeric(12,2),
  stock_status text not null default 'in_stock',
  created_at timestamptz not null default now()
);

create table if not exists media_assets (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  variant_id uuid references product_variants(id) on delete cascade,
  bucket text not null,
  path text not null,
  media_type text not null default 'image',
  position integer not null default 1,
  created_at timestamptz not null default now()
);

--------------------------------------------------------------------------------
-- 3. Pricing & promotions (Discounts/Coupons requirement)
--------------------------------------------------------------------------------

create table if not exists price_lists (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  currency text not null default 'ZAR',
  region_code text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists prices (
  id uuid primary key default uuid_generate_v4(),
  variant_id uuid references product_variants(id) on delete cascade,
  price_list_id uuid references price_lists(id) on delete cascade,
  amount numeric(12,2) not null,
  valid_from timestamptz,
  valid_to timestamptz
);

create unique index if not exists prices_variant_period_idx
  on prices (
    variant_id,
    price_list_id,
    coalesce(valid_from, 'epoch'::timestamptz),
    coalesce(valid_to, 'infinity'::timestamptz)
  );

create table if not exists discounts (
  id uuid primary key default uuid_generate_v4(),
  code text unique,
  name text not null,
  type text not null check (type in ('percentage','amount','bogo')),
  parameters jsonb not null default '{}'::jsonb,
  usage_limit integer,
  starts_at timestamptz,
  ends_at timestamptz,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

--------------------------------------------------------------------------------
-- 4. Shopping carts & wishlists (Shopping_Cart + Wishlists requirements)
--------------------------------------------------------------------------------

create table if not exists carts (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  status text not null default 'active',
  session_id text,
  currency text not null default 'ZAR',
  updated_at timestamptz not null default now()
);

create table if not exists cart_items (
  id uuid primary key default uuid_generate_v4(),
  cart_id uuid references carts(id) on delete cascade,
  variant_id uuid references product_variants(id),
  product_id uuid references products(id),
  quantity integer not null default 1,
  unit_price numeric(12,2),
  metadata jsonb not null default '{}'::jsonb
);

create unique index if not exists cart_items_unique_variant
  on cart_items (cart_id, variant_id)
  where variant_id is not null;

create unique index if not exists cart_items_unique_product
  on cart_items (cart_id, product_id)
  where variant_id is null;

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

--------------------------------------------------------------------------------
-- 5. Orders, payments, shipping (Orders, Order_Items, Payments, Shipping requirements)
--------------------------------------------------------------------------------

create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique,
  profile_id uuid references profiles(id),
  vendor_id uuid references vendors(id),
  cart_id uuid references carts(id),
  status text not null default 'pending',
  channel text not null default 'marketplace',
  currency text not null default 'ZAR',
  subtotal_cents integer not null default 0,
  tax_cents integer not null default 0,
  discount_cents integer not null default 0,
  shipping_cents integer not null default 0,
  total_cents integer not null default 0,
  payment_status text not null default 'unpaid',
  fulfillment_status text not null default 'unfulfilled',
  placed_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  variant_id uuid references product_variants(id),
  product_id uuid references products(id),
  quantity integer not null default 1,
  unit_price_cents integer not null,
  tax_cents integer not null default 0,
  discount_cents integer not null default 0,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists order_addresses (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  address_type text not null check (address_type in ('shipping','billing')),
  address jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  provider text not null default 'paystack',
  amount_cents integer not null,
  currency text not null default 'ZAR',
  status text not null default 'initiated',
  provider_reference text,
  payment_method text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists payment_transactions (
  id uuid primary key default uuid_generate_v4(),
  payment_id uuid references payments(id) on delete cascade,
  type text not null check (type in ('authorization','capture','refund','payout')),
  amount_cents integer not null,
  status text not null,
  gateway_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists shipments (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  carrier text,
  service_level text,
  tracking_number text,
  status text not null default 'pending',
  shipped_at timestamptz,
  delivered_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists shipment_items (
  id uuid primary key default uuid_generate_v4(),
  shipment_id uuid references shipments(id) on delete cascade,
  order_item_id uuid references order_items(id) on delete cascade,
  quantity integer not null default 1
);

--------------------------------------------------------------------------------
-- 6. Promotions, loyalty, and financial governance (continues Discounts/Coupons)
--------------------------------------------------------------------------------

create table if not exists discount_redemptions (
  id uuid primary key default uuid_generate_v4(),
  discount_id uuid references discounts(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  order_id uuid references orders(id) on delete cascade,
  redeemed_at timestamptz not null default now(),
  unique (discount_id, profile_id, order_id)
);

create table if not exists loyalty_accounts (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid unique references profiles(id) on delete cascade,
  points_balance integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists loyalty_transactions (
  id uuid primary key default uuid_generate_v4(),
  account_id uuid references loyalty_accounts(id) on delete cascade,
  type text not null check (type in ('earn','spend','adjustment')),
  points integer not null,
  order_id uuid references orders(id) on delete cascade,
  memo text,
  created_at timestamptz not null default now()
);

--------------------------------------------------------------------------------
-- 7. Inventory & warehousing (Inventory requirement)
--------------------------------------------------------------------------------

create table if not exists warehouses (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  timezone text not null default 'Africa/Johannesburg',
  address jsonb,
  contact text,
  created_at timestamptz not null default now()
);

create table if not exists inventory_items (
  id uuid primary key default uuid_generate_v4(),
  variant_id uuid references product_variants(id) on delete cascade,
  warehouse_id uuid references warehouses(id) on delete cascade,
  on_hand integer not null default 0,
  reserved integer not null default 0,
  safety_stock integer not null default 0,
  updated_at timestamptz not null default now(),
  unique(variant_id, warehouse_id)
);

create table if not exists inventory_movements (
  id uuid primary key default uuid_generate_v4(),
  variant_id uuid references product_variants(id) on delete cascade,
  warehouse_id uuid references warehouses(id) on delete cascade,
  movement_type text not null,
  quantity integer not null,
  reference_type text,
  reference_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists reorder_rules (
  id uuid primary key default uuid_generate_v4(),
  variant_id uuid references product_variants(id) on delete cascade,
  warehouse_id uuid references warehouses(id) on delete cascade,
  min_level integer not null default 0,
  max_level integer,
  lead_time_days integer default 7,
  created_at timestamptz not null default now(),
  unique(variant_id, warehouse_id)
);

--------------------------------------------------------------------------------
-- 8. Reviews, logs, support, analytics (Reviews, Logs, Support_Tickets, Analytics requirements)
--------------------------------------------------------------------------------

create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  title text,
  body text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references profiles(id),
  action text not null,
  target_type text not null,
  target_id uuid,
  payload jsonb not null default '{}'::jsonb,
  ip_address text,
  created_at timestamptz not null default now()
);

create table if not exists support_tickets (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete set null,
  subject text not null,
  priority text not null default 'normal',
  status text not null default 'open',
  channel text not null default 'web',
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table if not exists support_messages (
  id uuid primary key default uuid_generate_v4(),
  ticket_id uuid references support_tickets(id) on delete cascade,
  sender_type text not null check (sender_type in ('customer','agent','vendor','system')),
  body text not null,
  attachments jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists analytics_events (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id),
  event_name text not null,
  event_properties jsonb not null default '{}'::jsonb,
  context jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now()
);

--------------------------------------------------------------------------------
-- 9. Business services & compliance (CIPC services requirement)
--------------------------------------------------------------------------------

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

--------------------------------------------------------------------------------
-- 10. Storage buckets (create via Supabase storage UI)
--------------------------------------------------------------------------------
-- vendor-media (folders: logos, banners)
-- vendor-documents (folders: ids)
-- registration-documents (folders: ids, proof)

--------------------------------------------------------------------------------
-- 11. Security scaffolding (Row Level Security enablement)
--------------------------------------------------------------------------------

alter table profiles enable row level security;
alter table user_addresses enable row level security;
alter table vendors enable row level security;
alter table products enable row level security;
alter table product_variants enable row level security;
alter table carts enable row level security;
alter table cart_items enable row level security;
alter table wishlists enable row level security;
alter table wishlist_items enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table payments enable row level security;
alter table reviews enable row level security;
alter table support_tickets enable row level security;
alter table support_messages enable row level security;

create policy "Individuals manage their own profile"
  on profiles for select using (auth.uid() = id);

create policy "Customers read their carts"
  on carts for select using (auth.uid() = profile_id);

create policy "Customers mutate their cart items"
  on cart_items for all using (
    exists (
      select 1 from carts c
      where c.id = cart_items.cart_id and c.profile_id = auth.uid()
    )
  );

create policy "Vendors manage their products"
  on products for all using (
    exists (
      select 1 from vendors v
      where v.id = products.vendor_id and v.profile_id = auth.uid()
    )
  );

--------------------------------------------------------------------------------
-- 12. Reference checklist back to enterprise requirements
--------------------------------------------------------------------------------
-- Users / accounts: profiles, user_addresses
-- Products: products, product_variants, media_assets
-- Categories: categories, product_category_map
-- Orders: orders, order_items, order_addresses
-- Order_Items: order_items
-- Shopping_Cart: carts, cart_items
-- Payments: payments, payment_transactions
-- Shipping: shipments, shipment_items, order_addresses
-- Reviews: reviews
-- Wishlists: wishlists, wishlist_items
-- Inventory: warehouses, inventory_items, inventory_movements, reorder_rules
-- Discounts/Coupons: price_lists, prices, discounts, discount_redemptions
-- Logs: audit_logs
-- Support_Tickets: support_tickets, support_messages
-- Analytics: analytics_events
-- Business services: cipc_registration_requests
