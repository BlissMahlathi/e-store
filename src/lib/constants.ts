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

export const PRODUCTS = [
  { id: "p1", name: "Smart Garden Kit", vendor: "Umuzi Atelier", category: "Products", price: 2599, rating: 4.8, status: "ready" },
  { id: "p2", name: "Brand Identity Sprint", vendor: "Studio Brava", category: "Services", price: 4999, rating: 4.9, status: "ready" },
  { id: "p3", name: "Mobile Bar Experience", vendor: "Copper & Lime", category: "Services", price: 2499, rating: 4.7, status: "ready" },
  { id: "p4", name: "Wellness Retreat", vendor: "Luxe Escapes", category: "Experiences", price: 8999, rating: 4.9, status: "coming soon" },
  { id: "p5", name: "Pop-up Retail Booth", vendor: "Kasi Collective", category: "Services", price: 3299, rating: 4.6, status: "ready" },
  { id: "p6", name: "Premium Coffee Subscription", vendor: "Origin Roasters", category: "Products", price: 699, rating: 4.8, status: "ready" },
  { id: "p7", name: "AI Copywriting Sprint", vendor: "PromptLab", category: "Services", price: 1899, rating: 4.5, status: "ready" },
  { id: "p8", name: "Custom Furniture", vendor: "Maker Studios", category: "Products", price: 11999, rating: 4.9, status: "ready" },
];

export type Product = (typeof PRODUCTS)[number];

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

export const VENDOR_METRICS = {
  earnings: 12_400,
  orders: 142,
  avgOrderValue: 870,
};

export const ADMIN_KPIS = [
  { label: "GMV (6m)", value: "R2.4m", delta: "+18%" },
  { label: "Active vendors", value: "320", delta: "+24" },
  { label: "Customers", value: "12.8k", delta: "+640" },
  { label: "Net commissions", value: "R280k", delta: "+12%" },
];

export const VENDOR_ORDERS = [
  { id: "#1845", item: "Smart Garden Kit", customer: "Zinzi Q.", value: 2599, status: "Paid" },
  { id: "#1844", item: "Brand Identity Sprint", customer: "Musa L.", value: 4999, status: "In review" },
  { id: "#1843", item: "Mobile Bar Experience", customer: "Sipho P.", value: 2499, status: "Fulfilled" },
];

export const ADMIN_ORDERS = [
  { id: "#1901", item: "Vendor payout", customer: "Studio Brava", value: 18450, status: "Awaiting" },
  { id: "#1899", item: "Commission invoice", customer: "Kasi Collective", value: 7200, status: "Paid" },
  { id: "#1896", item: "Refund review", customer: "Copper & Lime", value: 2499, status: "Pending" },
];

export const SALES_STREAM = [
  { ref: "S-204", vendor: "Umuzi Atelier", channel: "Marketplace", orders: 7, total: 18200, status: "Settled" },
  { ref: "S-203", vendor: "Studio Brava", channel: "Services", orders: 3, total: 14997, status: "Processing" },
  { ref: "S-201", vendor: "PromptLab", channel: "Digital", orders: 11, total: 20890, status: "Settled" },
  { ref: "S-198", vendor: "Maker Studios", channel: "Custom", orders: 4, total: 47996, status: "Awaiting" },
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
