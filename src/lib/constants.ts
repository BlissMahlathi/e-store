export type UserRole = "guest" | "customer" | "vendor" | "admin";

export const COMPANY_NAME = "INHIMStore";
export const COMPANY_TAGLINE = "Operated by INHIM Trading (Pty) Ltd";
export const REGISTRATION_EMAIL = "inhimtrading7@gmail.com";
export const SUPPORT_PHONE_DISPLAY = "071 523 1720";
export const SUPPORT_PHONE_DIAL = "+27715231720";
export const SUPPORT_WHATSAPP_URL = "https://wa.me/27715231720";

export const ALLOWED_ROLES: UserRole[] = [
  "guest",
  "customer",
  "vendor",
  "admin",
];

export const COMMISSION_RATE = 0.12;
export const DISCOUNT_THRESHOLD_AMOUNT = 15_000;
export const DISCOUNT_PERIOD_MONTHS = 6;
export const HIGH_PERFORMER_DISCOUNT = 0.03;

export type NavLink = {
  label: string;
  href: string;
  roles?: UserRole[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "home", href: "/" },
  { label: "marketplace", href: "/marketplace" },
  { label: "pricing", href: "/pricing" },
  { label: "about", href: "/about" },
  { label: "support", href: "/support" },
  { label: "business services", href: "/services/cipc-support" },
  {
    label: "vendor dashboard",
    href: "/dashboard/vendor",
    roles: ["vendor", "admin"],
  },
  { label: "admin", href: "/dashboard/admin", roles: ["admin"] },
];

export const HERO_STATS = [
  { label: "Status", value: "Live" },
  { label: "Active vendors", value: "24+" },
  { label: "Headquarters", value: "Nkowankowa, Limpopo" },
];

export const FEATURE_STEPS = [
  {
    title: "Vendor application",
    body: "Our directors personally review each application to ensure quality and alignment with our marketplace standards.",
  },
  {
    title: "Catalog curation",
    body: "C Maenetja works with every vendor to align imagery, pricing, and delivery promises for optimal presentation.",
  },
  {
    title: "Commission onboarding",
    body: "We activate flexible fee tiers and payouts managed directly by INHIM Trading for seamless operations.",
  },
];

export const VENDOR_DASHBOARD_LINKS = [
  { label: "Overview", href: "/dashboard/vendor" },
  { label: "Catalog", href: "/dashboard/vendor/catalog" },
  { label: "Orders", href: "/dashboard/vendor/orders" },
  { label: "Earnings", href: "/dashboard/vendor/earnings" },
  { label: "Settings", href: "/dashboard/vendor/settings" },
];

export const ADMIN_DASHBOARD_LINKS = [
  { label: "Overview", href: "/dashboard/admin" },
  { label: "Vendors", href: "/dashboard/admin/vendors" },
  { label: "Customers", href: "/dashboard/admin/customers" },
  { label: "Commissions", href: "/dashboard/admin/commissions" },
  { label: "Settings", href: "/dashboard/admin/settings" },
];

export const BUSINESS_SERVICE_STEPS = [
  {
    title: "Document intake",
    body: "Collect certified ID, proof of address, and preferred company names in one secure submission.",
  },
  {
    title: "CIPC filing",
    body: "INHIM Trading liaises with CIPC on your behalf and keeps you updated on each milestone.",
  },
  {
    title: "Post-registration setup",
    body: "We guide you through tax, bank, and Paystack onboarding so you can sell immediately on the marketplace.",
  },
];

export const COMMISSION_TIERS = [
  {
    label: "Starter",
    range: "0 - R15,000",
    rate: "12%",
    benefit: "Standard analytics, weekly payouts",
  },
  {
    label: "Growth",
    range: "R15,000 - R60,000",
    rate: "9%",
    benefit: "Priority placement, promo codes",
  },
  {
    label: "Elite",
    range: "R60,000+",
    rate: "7%",
    benefit: "Seasonal boosts, dedicated success manager",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "INHIMStore treats every listing like a flagship boutique, which is why I chose to sell here.",
    author: "Naledi",
    role: "Home fragrance founder",
  },
  {
    quote:
      "We are committed to operational excellence, ensuring every transaction meets our high standards.",
    author: "Mr HB Mahlathi",
    role: "Director, INHIM Trading",
  },
  {
    quote:
      "My priority is giving vendors a direct line to our team—no generic call centres, just real partners.",
    author: "C Maenetja",
    role: "Store Manager, INHIMStore",
  },
];
