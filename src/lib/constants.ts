export type UserRole = "guest" | "customer" | "vendor" | "admin";

export const COMPANY_NAME = "INHIM Trading (Pty) Ltd";
export const COMPANY_TAGLINE = "CIPC registered since 2018";
export const REGISTRATION_EMAIL = "inhimtrading7@gmail.com";

export const ALLOWED_ROLES: UserRole[] = ["guest", "customer", "vendor", "admin"];

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
  { label: "vendor dashboard", href: "/dashboard/vendor", roles: ["vendor", "admin"] },
  { label: "admin", href: "/dashboard/admin", roles: ["admin"] },
];

export const HERO_STATS = [
  { label: "Vendors live", value: "320" },
  { label: "Avg. commission", value: "12%" },
  { label: "Customer NPS", value: "+64" },
];

export const FEATURE_STEPS = [
  {
    title: "Lightning onboarding",
    body: "Every visitor arrives as a customer and can become a vendor with one flow.",
  },
  {
    title: "Dashboard clarity",
    body: "Vendors track earnings, orders, and commission progress while admins monitor the store.",
  },
  {
    title: "Commission rewards",
    body: "Sell beyond R15,000 in six months to earn automatic fee discounts and perks.",
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
    quote: "We crossed R150k in four months thanks to featured placements and transparent commissions.",
    author: "Naledi",
    role: "Wellness vendor",
  },
  {
    quote: "Dashboard alerts let the main admin spot growth patterns without extra tools.",
    author: "Thabo",
    role: "Main admin",
  },
];
