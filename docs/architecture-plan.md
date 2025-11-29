# e-store: Architecture & Experience Plan

## Objectives
- Provide a modern, minimal multi-vendor storefront where anyone is a customer by default and can upgrade to vendor role.
- Support commission-based revenue with discount incentives for top-performing vendors (≥ R15,000 in 6 months).
- Deliver a performant UX with a branded loading experience, smooth GSAP-driven transitions, and shadcn/ui components styled via Tailwind.
- Give vendors and admins dedicated dashboards, each with role-specific tooling and analytics (Chart.js).

## Core Stack
| Layer | Choice | Reason |
| --- | --- | --- |
| Framework | Next.js 14 (App Router, TypeScript) | File-based routing, server components, metadata, API routes. |
| Styling | Tailwind CSS + shadcn/ui | Consistent design tokens, accessible components, easy theming. |
| Animations | GSAP + `useGsap` hook | Precise control over timeline-based motion. |
| Charts | `react-chartjs-2` + Chart.js | Visualize KPIs for vendors/admins. |
| State | React Context + server actions (future: Auth provider) | Handle auth roles, feature gating, cookie consent. |
| Data & Auth | Supabase (Postgres, Auth, Storage) | Managed backend for vendor/customer data, file uploads, and role-based auth. |
| Payments | Paystack | Commission-friendly payments for SA/Nigeria with webhooks for payouts. |

## Roles & Access
- **Guest / Customer (default):** Browse marketplace, view vendor cards, limited product detail. Must register/login to checkout.
- **Vendor:** Everything customers can do plus access to vendor dashboard for catalog, orders, earnings, discount status.
- **Admin:** Full oversight via admin dashboard: monitor vendors/customers, manage commissions, approve listings, view analytics.

Role-aware utilities will live inside `src/lib/constants.ts` & `src/lib/roles.ts` to keep thresholds, commission percentages, and feature flags centralized for version control.

## Supabase Integration Plan
- **Auth:** Supabase Auth (email/password + magic links). Client helper in `src/lib/supabase/client.ts`, server helper in `src/lib/supabase/server.ts`. Replace current mock `AuthProvider` with Supabase session provider.
- **Database tables:**
	- `profiles` (id, role, full_name, phone, verified flags)
	- `vendors` (profile_id FK, business_name, cipc_status, location, description, store settings, contact info)
	- `store_settings` (vendor_id FK, banner_image, delivery_options JSON, operating_hours JSON)
	- `documents` (vendor_id FK, id_number, id_document_url, registration_number, tax_number)
	- `products` / `services` referencing vendors
- **Storage buckets:** `vendor-media` (logos, banners), `documents` (ID scans). Use signed URLs.
- **Server actions:** use Supabase Service Role on server actions/api routes for onboarding submissions and file metadata writes.
- **Environment:** `.env.local` needs `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `PAYSTACK_SECRET_KEY`, `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`.

## Payments (Paystack)
- Checkout button will initialize Paystack inline flow for registered customers with email + amount.
- Webhook endpoint `/api/paystack/webhook` validates signature, records commission and payout schedule in Supabase.
- Commission calculation uses constants and stored vendor tier.

## Page & Route Map (8+ top-level pages)
1. `/` – Landing page with hero (GSAP), CTA to register/login, highlights of vendor program.
2. `/marketplace` – Product/service listing (filterable cards).
3. `/about` – Mission, trust signals, partner logos.
4. `/pricing` – Commission explanation, discount incentive table.
5. `/vendors/register` – Vendor onboarding wizard.
6. `/login` – Auth entry for customers/vendors/admins.
7. `/dashboard/vendor` – Vendor shell w/ nested pages: overview, products & services, orders, earnings, settings.
8. `/dashboard/admin` – Admin shell w/ nested pages: overview, vendor management, customer insights, payouts, store settings.
9. `/support` (optional) – Contact/help center for completeness.

Each dashboard section will feature Chart.js widgets, tables (shadcn `Table`), and cards sourced from shared constants.

## Experience Notes
- **Global loading screen:** `app/loading.tsx` with brand mark, GSAP pulse, and optional tips.
- **Cookie consent:** Non-blocking banner storing consent flag via `next/headers` cookies and hydration-safe context.
- **Animations:** Use GSAP timelines invoked through a reusable `useGsap` hook to keep DOM refs isolated to client components.
- **Responsiveness:** Tailwind container queries + shadcn breakpoints ensure mobile-first layout.

## Data & Constants
Located inside `src/lib/constants.ts`:
- `COMMISSION_RATE`, `DISCOUNT_THRESHOLD_AMOUNT`, `DISCOUNT_PERIOD_MONTHS`.
- Mock `products`, `vendors`, `metrics` for dashboards.
- `NAV_LINKS`, `DASHBOARD_SIDEBAR` definitions for consistent navigation.

## Implementation Phases
1. Scaffold Next.js workspace with Tailwind & shadcn/ui.
2. Add global providers (`AuthProvider`, `CookieConsentProvider`, `ThemeProvider`).
3. Build shared UI primitives (buttons, cards, charts) using shadcn + Tailwind.
4. Implement landing/marketing pages with GSAP hero + cookie consent.
5. Implement vendor & admin dashboards with nested layouts, Chart.js widgets, and gated routes.
6. Introduce Supabase clients, Auth wrapper, and vendor onboarding mutation with storage uploads.
7. Integrate Paystack checkout + webhook for commission tracking.
8. Wire structured constants, mock data, and role-based guards; replace mocks with live Supabase data feature-by-feature.
