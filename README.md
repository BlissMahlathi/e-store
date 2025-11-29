## e-store

Modern multi-vendor storefront where every visitor starts as a customer yet can upgrade to vendor status and access role-specific dashboards.

### Stack
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4 + shadcn/ui components
- GSAP + custom `useGsap` hook for animations
- Chart.js via `react-chartjs-2` for analytics cards
- React Hook Form + Zod for onboarding flows
- Supabase (Postgres, Auth, Storage) for vendor/customer data
- Paystack inline checkout for commission-based payments

### Experience highlights
- Minimal loading screen, cookie consent banner, and GSAP hero animations
- 8+ routes covering marketplace, pricing, about, support, privacy, vendor onboarding, login, and dual dashboards (vendor/admin)
- Commission & incentive constants centralized in `src/lib/constants.ts` for easier versioning
- Role-aware UI (checkout gating, dashboard navigation, vendor discount progress)

### Getting started
```bash
npm install
npm run dev
# visit http://localhost:3000
```

Create your `.env.local` from `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_SECRET_KEY=sk_test_...
```

### Structure
- `src/app` – App Router pages and layouts
- `src/components` – UI blocks, dashboards, forms, providers, cookie consent
- `src/lib/constants.ts` – navigation, dashboard links, commission math, mock data
- `docs/architecture-plan.md` – architecture + experience planning notes
