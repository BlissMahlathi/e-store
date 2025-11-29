import { COMMISSION_RATE, DISCOUNT_PERIOD_MONTHS, DISCOUNT_THRESHOLD_AMOUNT } from "@/lib/constants";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export type DashboardOrder = {
  id: string;
  orderNumber: string;
  customer: string;
  value: number;
  status: string;
  placedAt: string;
};

export type SalesStreamEntry = {
  id: string;
  vendor: string;
  ref: string;
  channel: string;
  orders: number;
  total: number;
  status: string;
};

export type ChartSeries = {
  labels: string[];
  dataset: number[];
};

export type CatalogProduct = {
  id: string;
  name: string;
  price: number;
  status: string;
  vendorName: string;
};

export type VendorDashboardData = {
  vendor: {
    id: string;
    name: string;
    commissionRate: number;
  };
  metrics: {
    earnings: number;
    orders: number;
    avgOrderValue: number;
    pendingPayout: number;
    discountPercent: number;
  };
  chart: ChartSeries;
  orders: DashboardOrder[];
  salesStream: SalesStreamEntry[];
  catalog: CatalogProduct[];
};

export type AdminDashboardData = {
  kpis: { label: string; value: string; helper?: string }[];
  charts: {
    onboarding: ChartSeries;
    commissions: ChartSeries;
  };
  orders: DashboardOrder[];
  salesStream: SalesStreamEntry[];
};

export type AdminVendorSummary = {
  id: string;
  name: string;
  status: string;
  listingCount: number;
  gmv: number;
};

type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
type VendorRow = Database["public"]["Tables"]["vendors"]["Row"];
type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

type SeriesBucket = {
  key: string;
  label: string;
  total: number;
};

type SupabaseServerClient = SupabaseClient<Database>;

type VendorContext = {
  supabase: SupabaseServerClient;
  vendor: VendorRow;
};

const centsToRands = (value: number | string | null | undefined) => {
  if (typeof value === "number") return value / 100;
  if (typeof value === "string") return Number(value) / 100;
  return 0;
};

const formatStatus = (order: OrderRow) => {
  if (order.payment_status?.toLowerCase() === "paid") {
    return order.fulfillment_status ?? order.status ?? "Paid";
  }
  if (order.status?.toLowerCase() === "fulfilled") return "Fulfilled";
  return order.status ?? "Pending";
};

const getMonthBuckets = (months: number, locale = "en-ZA") => {
  const now = new Date();
  return Array.from({ length: months }).map((_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (months - index - 1), 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: new Intl.DateTimeFormat(locale, { month: "short" }).format(date),
      total: 0,
    } satisfies SeriesBucket;
  });
};

const assignToMonthBucket = (buckets: SeriesBucket[], dateString: string | null) => {
  if (!dateString) return;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return;
  const key = `${date.getFullYear()}-${date.getMonth()}`;
  const bucket = buckets.find((entry) => entry.key === key);
  if (bucket) {
    bucket.total += 1;
  }
};

const assignAmountToMonthBucket = (buckets: SeriesBucket[], dateString: string | null, amount: number) => {
  if (!dateString) return;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return;
  const key = `${date.getFullYear()}-${date.getMonth()}`;
  const bucket = buckets.find((entry) => entry.key === key);
  if (bucket) {
    bucket.total += amount;
  }
};

const mapProfiles = (rows: ProfileRow[] = []) => new Map(rows.map((profile) => [profile.id, profile]));

const buildOrdersList = (orders: OrderRow[], profileMap: Map<string, ProfileRow>, limit = 5): DashboardOrder[] =>
  orders.slice(0, limit).map((order) => ({
    id: order.id,
    orderNumber: order.order_number ?? order.id,
    customer: profileMap.get(order.profile_id ?? "")?.display_name ?? "Customer",
    value: centsToRands(order.total_cents),
    status: formatStatus(order),
    placedAt: order.placed_at,
  }));

const resolveVendorContext = async (): Promise<VendorContext> => {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data: vendor, error: vendorError } = await supabase.from("vendors").select("*").eq("profile_id", user.id).maybeSingle();

  if (vendorError) {
    throw new Error(`Failed to load vendor profile: ${vendorError.message}`);
  }

  if (!vendor) {
    throw new Error("Vendor profile not found");
  }

  return { supabase, vendor: vendor as VendorRow };
};

const loadVendorOrders = async (supabase: SupabaseServerClient, vendorId: string, limit = 50): Promise<OrderRow[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("vendor_id", vendorId)
    .order("placed_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to load vendor orders: ${error.message}`);
  }

  return (data ?? []) as OrderRow[];
};

const loadVendorCatalog = async (supabase: SupabaseServerClient, vendorId: string, limit = 50): Promise<ProductRow[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("vendor_id", vendorId)
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to load vendor catalog: ${error.message}`);
  }

  return (data ?? []) as ProductRow[];
};

const fetchProfilesByIds = async (supabase: SupabaseServerClient, ids: string[]): Promise<ProfileRow[]> => {
  if (!ids.length) {
    return [] as ProfileRow[];
  }

  const { data, error } = await supabase.from("profiles").select("*").in("id", ids);

  if (error) {
    throw new Error(`Failed to load profiles: ${error.message}`);
  }

  return (data ?? []) as ProfileRow[];
};

export async function fetchVendorDashboardData(): Promise<VendorDashboardData> {
  const { supabase, vendor } = await resolveVendorContext();
  const [orders, catalogRows] = await Promise.all([loadVendorOrders(supabase, vendor.id, 50), loadVendorCatalog(supabase, vendor.id, 50)]);

  const profileIds = Array.from(new Set(orders.map((order) => order.profile_id).filter(Boolean) as string[]));
  const profiles = await fetchProfilesByIds(supabase, profileIds);

  const profileMap = mapProfiles(profiles ?? []);
  const paidOrders = orders.filter((order) => order.payment_status?.toLowerCase() === "paid");
  const pendingOrders = orders.filter((order) => order.payment_status?.toLowerCase() !== "paid");
  const earnings = paidOrders.reduce((sum, order) => sum + centsToRands(order.total_cents), 0);
  const pendingPayout = pendingOrders.reduce((sum, order) => sum + centsToRands(order.total_cents), 0);
  const orderCount = paidOrders.length;
  const avgOrderValue = orderCount ? earnings / orderCount : 0;
  const discountPercent = Math.min(100, (earnings / DISCOUNT_THRESHOLD_AMOUNT) * 100);

  const monthBuckets = getMonthBuckets(DISCOUNT_PERIOD_MONTHS);
  paidOrders.forEach((order) => assignAmountToMonthBucket(monthBuckets, order.placed_at, centsToRands(order.total_cents)));

  const ordersList = buildOrdersList(orders, profileMap);

  const channelGroups = new Map<string, { channel: string; total: number; orders: number; status: string }>();
  orders.forEach((order) => {
    const channel = order.channel ?? "Marketplace";
    const group = channelGroups.get(channel) ?? { channel, total: 0, orders: 0, status: formatStatus(order) };
    group.total += centsToRands(order.total_cents);
    group.orders += 1;
    group.status = formatStatus(order);
    channelGroups.set(channel, group);
  });

  const salesStream: SalesStreamEntry[] = Array.from(channelGroups.values()).map((group) => ({
    id: `${vendor.id}-${group.channel}`,
    vendor: vendor.business_name,
    ref: group.channel.slice(0, 3).toUpperCase(),
    channel: group.channel,
    orders: group.orders,
    total: group.total,
    status: group.status,
  }));

  const catalog: CatalogProduct[] = catalogRows.map((product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.base_price ?? 0),
    status: product.status,
    vendorName: vendor.business_name,
  }));

  return {
    vendor: {
      id: vendor.id,
      name: vendor.business_name,
      commissionRate: vendor.commission_rate ?? COMMISSION_RATE,
    },
    metrics: {
      earnings,
      orders: orderCount,
      avgOrderValue,
      pendingPayout,
      discountPercent,
    },
    chart: {
      labels: monthBuckets.map((bucket) => bucket.label),
      dataset: monthBuckets.map((bucket) => Number(bucket.total.toFixed(2))),
    },
    orders: ordersList,
    salesStream,
    catalog,
  };
}

export async function fetchVendorCatalogProducts(limit = 100): Promise<CatalogProduct[]> {
  const { supabase, vendor } = await resolveVendorContext();
  const catalogRows = await loadVendorCatalog(supabase, vendor.id, limit);
  return catalogRows.map((product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.base_price ?? 0),
    status: product.status,
    vendorName: vendor.business_name,
  }));
}

export async function fetchVendorOrdersList(limit = 20): Promise<DashboardOrder[]> {
  const { supabase, vendor } = await resolveVendorContext();
  const orders = await loadVendorOrders(supabase, vendor.id, limit);
  const profileIds = Array.from(new Set(orders.map((order) => order.profile_id).filter(Boolean) as string[]));
  const profiles = await fetchProfilesByIds(supabase, profileIds);
  const profileMap = mapProfiles(profiles ?? []);
  return buildOrdersList(orders, profileMap, limit);
}

export async function fetchAdminDashboardData(): Promise<AdminDashboardData> {
  const supabase = await getSupabaseServerClient();

  const [{ data: orderRows, error: ordersError }, { data: vendorRows, error: vendorsError }, { data: profileRows, error: profilesError }] =
    await Promise.all([
      supabase
        .from("orders")
        .select("*")
        .order("placed_at", { ascending: false })
        .limit(100),
      supabase
        .from("vendors")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100),
      supabase.from("profiles").select("*"),
    ]);

  if (ordersError) {
    throw new Error(`Failed to load orders: ${ordersError.message}`);
  }
  if (vendorsError) {
    throw new Error(`Failed to load vendors: ${vendorsError.message}`);
  }
  if (profilesError) {
    throw new Error(`Failed to load profiles: ${profilesError.message}`);
  }

  const ordersData = (orderRows ?? []) as OrderRow[];
  const vendorData = (vendorRows ?? []) as VendorRow[];
  const profileData = (profileRows ?? []) as ProfileRow[];

  const profilesMap = mapProfiles(profileData);
  const vendorsMap = new Map(vendorData.map((vendor) => [vendor.id, vendor]));
  const paidOrders = ordersData.filter((order) => order.payment_status?.toLowerCase() === "paid");
  const gmv = paidOrders.reduce((sum, order) => sum + centsToRands(order.total_cents), 0);
  const commissionIncome = gmv * COMMISSION_RATE;
  const activeVendors = vendorData.filter((vendor) => vendor.status?.toLowerCase() === "active").length;
  const customers = profileData.filter((profile) => profile.role === "customer").length;

  const lastSixMonthsBuckets = getMonthBuckets(6);
  paidOrders.forEach((order) => assignAmountToMonthBucket(lastSixMonthsBuckets, order.placed_at, centsToRands(order.total_cents)));

  const onboardingBuckets = getMonthBuckets(6);
  vendorData.forEach((vendor) => assignToMonthBucket(onboardingBuckets, vendor.created_at ?? null));

  const ordersList: DashboardOrder[] = ordersData.slice(0, 5).map((order) => ({
    id: order.id,
    orderNumber: order.order_number ?? order.id,
    customer: profilesMap.get(order.profile_id ?? "")?.display_name ?? "Customer",
    value: centsToRands(order.total_cents),
    status: formatStatus(order),
    placedAt: order.placed_at,
  }));

  const salesGroups = new Map<string, { vendor: VendorRow | undefined; total: number; orders: number; status: string; channel: string }>();

  ordersData.forEach((order) => {
    const vendor = vendorsMap.get(order.vendor_id ?? "");
    const key = order.vendor_id ?? order.id;
    const group = salesGroups.get(key) ?? {
      vendor,
      total: 0,
      orders: 0,
      status: formatStatus(order),
      channel: order.channel ?? "Marketplace",
    };
    group.total += centsToRands(order.total_cents);
    group.orders += 1;
    group.status = formatStatus(order);
    salesGroups.set(key, group);
  });

  const salesStream: SalesStreamEntry[] = Array.from(salesGroups.entries()).slice(0, 6).map(([key, group]) => ({
    id: key,
    vendor: group.vendor?.business_name ?? "Unassigned vendor",
    ref: (group.vendor?.business_name ?? "Vendor").slice(0, 3).toUpperCase(),
    channel: group.channel,
    orders: group.orders,
    total: group.total,
    status: group.status,
  }));

  return {
    kpis: [
      { label: "GMV (6m)", value: `R${gmv.toLocaleString()}`, helper: "Paid orders" },
      { label: "Active vendors", value: activeVendors.toString(), helper: "Across marketplace" },
      { label: "Customers", value: customers.toString(), helper: "Profiles" },
      { label: "Net commissions", value: `R${commissionIncome.toLocaleString()}`, helper: `${Math.round(COMMISSION_RATE * 100)}% rate` },
    ],
    charts: {
      onboarding: {
        labels: onboardingBuckets.map((bucket) => bucket.label),
        dataset: onboardingBuckets.map((bucket) => bucket.total),
      },
      commissions: {
        labels: lastSixMonthsBuckets.map((bucket) => bucket.label),
        dataset: lastSixMonthsBuckets.map((bucket) => Number((bucket.total * COMMISSION_RATE).toFixed(2))),
      },
    },
    orders: ordersList,
    salesStream,
  };
}

export async function fetchAdminVendorSummaries(limit = 12): Promise<AdminVendorSummary[]> {
  const supabase = await getSupabaseServerClient();
  const { data: vendors, error: vendorsError } = await supabase
    .from("vendors")
    .select("*")
    .order("business_name", { ascending: true })
    .limit(limit);

  if (vendorsError) {
    throw new Error(`Failed to load vendors: ${vendorsError.message}`);
  }

  const vendorData = (vendors ?? []) as VendorRow[];
  const vendorIds = vendorData.map((vendor) => vendor.id);

  const [{ data: productRows, error: productsError }, { data: orderRows, error: ordersError }] = await Promise.all([
    vendorIds.length
      ? supabase.from("products").select("*").in("vendor_id", vendorIds)
      : Promise.resolve({ data: [], error: null } as { data: ProductRow[]; error: null }),
    vendorIds.length
      ? supabase.from("orders").select("*").in("vendor_id", vendorIds).limit(500)
      : Promise.resolve({ data: [], error: null } as { data: OrderRow[]; error: null }),
  ]);

  if (productsError) {
    throw new Error(`Failed to load products: ${productsError.message}`);
  }

  if (ordersError) {
    throw new Error(`Failed to load vendor GMV: ${ordersError.message}`);
  }

  const productData = (productRows ?? []) as ProductRow[];
  const orderData = (orderRows ?? []) as OrderRow[];

  const productCounts = productData.reduce<Record<string, number>>((acc, product) => {
    if (!product.vendor_id) return acc;
    acc[product.vendor_id] = (acc[product.vendor_id] ?? 0) + 1;
    return acc;
  }, {});

  const gmvByVendor = orderData.reduce<Record<string, number>>((acc, order) => {
    if (!order.vendor_id) return acc;
    if (order.payment_status?.toLowerCase() !== "paid") return acc;
    acc[order.vendor_id] = (acc[order.vendor_id] ?? 0) + centsToRands(order.total_cents);
    return acc;
  }, {});

  return vendorData.map((vendor) => ({
    id: vendor.id,
    name: vendor.business_name,
    status: vendor.status,
    listingCount: productCounts[vendor.id] ?? 0,
    gmv: gmvByVendor[vendor.id] ?? 0,
  }));
}
