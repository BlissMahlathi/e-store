## e-store

Modern multi-vendor storefront operated by **INHIM Trading (Pty) Ltd** (CIPC registered 2018) where every visitor starts as a customer yet can upgrade to vendor status and access role-specific dashboards.

- Paystack inline checkout for commission-based payments
- Minimal loading screen, cookie consent banner, and GSAP hero animations
- 8+ routes covering marketplace, pricing, about, support, privacy, vendor onboarding, login/register, CIPC services, and dual dashboards (vendor/admin)
- Commission & incentive constants centralized in `src/lib/constants.ts` for easier versioning
- Role-aware UI enforced server-side (middleware + Supabase session) with email verification requirements
- Built-in cart & wishlist overlays backed by Zustand state
- Business registration services form that forwards payloads to Supabase + email for INHIM Trading's compliance team
- Commission & incentive constants centralized in `src/lib/constants.ts` for easier versioning
- Role-aware UI (checkout gating, dashboard navigation, vendor discount progress)

### Getting started

Create your `.env.local` (or `.env`) from the template below and never commit the filled-in file:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_
PAYSTACK_SECRET_KEY=sk_test_
RESEND_API_KEY=
REGISTRATION_FORWARD_EMAIL=inhimtrading7@gmail.com
```

### Secrets & deployment

- `.env*` files are already ignored. If one slips into git history run `git rm --cached .env*` and recommit.
- Rotate compromised keys immediately inside Supabase, Paystack, and Resend. Update the rotated values in Netlify → Site settings → Build & deploy → Environment.
- Client-visible keys (every `NEXT_PUBLIC_*`) are intentionally allow‑listed via `SECRETS_SCAN_OMIT_KEYS` in `netlify.toml` so Netlify’s scanner doesn’t fail builds. Do **not** add server-only secrets (e.g., `SUPABASE_SERVICE_ROLE_KEY`, `PAYSTACK_SECRET_KEY`) to that list.
- After updating environment variables in Netlify, trigger a fresh deploy with “Clear cache and deploy site” to ensure stale build artifacts no longer contain old values.

### Structure
- `src/app` – App Router pages and layouts
- `src/components` – UI blocks, dashboards, forms, providers, cookie consent
- `src/lib/constants.ts` – navigation, dashboard links, commission math, mock data
- `docs/architecture-plan.md` – architecture + experience planning notes
