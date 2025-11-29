import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export type MarketplaceCategory = {
  id: string;
  label: string;
  slug: string;
  description: string | null;
  productCount: number;
};

export type MarketplaceProduct = {
  id: string;
  name: string;
  summary: string | null;
  vendorName: string;
  vendorId: string | null;
  price: number;
  currency: string;
  status: string;
  category: MarketplaceCategory | null;
  rating: {
    average: number | null;
    count: number;
  };
  thumbnailUrl: string | null;
  createdAt: string;
};

export type MarketplaceInventory = {
  products: MarketplaceProduct[];
  categories: MarketplaceCategory[];
};

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
type CategoryMapRow = Database["public"]["Tables"]["product_category_map"]["Row"];
type VendorRow = Database["public"]["Tables"]["vendors"]["Row"];
type MediaAssetRow = Database["public"]["Tables"]["media_assets"]["Row"];
type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"];

const toNumber = (value: number | string | null | undefined) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value);
  return 0;
};

const buildPublicUrl = (bucket: string, path: string) => {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  const normalized = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${normalized}/storage/v1/object/public/${bucket}/${path}`;
};

export async function fetchMarketplaceInventory(options: { limit?: number } = {}): Promise<MarketplaceInventory> {
  const supabase = await getSupabaseServerClient();
  const limit = options.limit ?? 60;

  const { data: productRows, error: productError } = await supabase
    .from("products")
    .select("id,name,summary,base_price,status,currency,vendor_id,created_at")
    .order("updated_at", { ascending: false })
    .limit(limit);

  if (productError) {
    throw new Error(`Failed to load products: ${productError.message}`);
  }

  const productIds = productRows?.map((product) => product.id) ?? [];
  const vendorIds = Array.from(new Set(productRows?.map((product) => product.vendor_id).filter(Boolean) as string[]));

  const [categoryRows, categoryMapRows, vendorRows, mediaRows, reviewRows] = await Promise.all([
    supabase
      .from("categories")
      .select("id,name,slug,description,is_active,sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    productIds.length
      ? supabase
          .from("product_category_map")
          .select("product_id,category_id")
          .in("product_id", productIds)
      : Promise.resolve({ data: [], error: null } as { data: CategoryMapRow[]; error: null }),
    vendorIds.length
      ? supabase
          .from("vendors")
          .select("id,business_name,status")
          .in("id", vendorIds)
      : Promise.resolve({ data: [], error: null } as { data: VendorRow[]; error: null }),
    productIds.length
      ? supabase
          .from("media_assets")
          .select("product_id,bucket,path,media_type,position")
          .in("product_id", productIds)
          .order("position", { ascending: true })
      : Promise.resolve({ data: [], error: null } as { data: MediaAssetRow[]; error: null }),
    productIds.length
      ? supabase.from("reviews").select("product_id,rating").in("product_id", productIds)
      : Promise.resolve({ data: [], error: null } as { data: ReviewRow[]; error: null }),
  ]);

  const categoryError = categoryRows.error || categoryMapRows.error;
  if (categoryError) {
    throw new Error(`Failed to load categories: ${categoryError.message}`);
  }

  if (vendorRows.error) {
    throw new Error(`Failed to load vendors: ${vendorRows.error.message}`);
  }

  if (mediaRows.error) {
    throw new Error(`Failed to load product media: ${mediaRows.error.message}`);
  }

  if (reviewRows.error) {
    throw new Error(`Failed to load product reviews: ${reviewRows.error.message}`);
  }

  const vendorsById = new Map((vendorRows.data ?? []).map((vendor) => [vendor.id, vendor]));
  const categoriesById = new Map((categoryRows.data ?? []).map((category) => [category.id, category]));
  const productCategories = new Map<string, CategoryRow | null>();

  (categoryMapRows.data ?? []).forEach((entry) => {
    if (!productCategories.has(entry.product_id)) {
      productCategories.set(entry.product_id, categoriesById.get(entry.category_id) ?? null);
    }
  });

  const mediaByProduct = new Map<string, MediaAssetRow>();
  (mediaRows.data ?? []).forEach((media) => {
    if (!media.product_id) return;
    if (!mediaByProduct.has(media.product_id)) {
      mediaByProduct.set(media.product_id, media);
    }
  });

  const ratingsByProduct = new Map<string, { total: number; count: number }>();
  (reviewRows.data ?? []).forEach((review) => {
    if (!review.product_id) return;
    const current = ratingsByProduct.get(review.product_id) ?? { total: 0, count: 0 };
    ratingsByProduct.set(review.product_id, {
      total: current.total + review.rating,
      count: current.count + 1,
    });
  });

  const products: MarketplaceProduct[] = (productRows ?? []).map((product: ProductRow) => {
    const category = productCategories.get(product.id) ?? null;
    const vendor = (product.vendor_id && vendorsById.get(product.vendor_id)) || null;
    const media = mediaByProduct.get(product.id);
    const ratingAggregate = ratingsByProduct.get(product.id);
    const thumbnailUrl = media && media.bucket && media.path ? buildPublicUrl(media.bucket, media.path) : null;

    return {
      id: product.id,
      name: product.name,
      summary: product.summary,
      vendorName: vendor?.business_name ?? "Unassigned vendor",
      vendorId: product.vendor_id,
      price: toNumber(product.base_price),
      currency: product.currency ?? "ZAR",
      status: product.status,
      category: category
        ? {
            id: category.id,
            label: category.name,
            slug: category.slug,
            description: category.description,
            productCount: 0,
          }
        : null,
      rating: {
        average: ratingAggregate && ratingAggregate.count > 0 ? ratingAggregate.total / ratingAggregate.count : null,
        count: ratingAggregate?.count ?? 0,
      },
      thumbnailUrl,
      createdAt: product.created_at,
    };
  });

  const countsByCategoryId = (categoryMapRows.data ?? []).reduce<Record<string, number>>((acc, entry) => {
    acc[entry.category_id] = (acc[entry.category_id] ?? 0) + 1;
    return acc;
  }, {});

  const categories: MarketplaceCategory[] = (categoryRows.data ?? []).map((category: CategoryRow) => ({
    id: category.id,
    label: category.name,
    slug: category.slug,
    description: category.description,
    productCount: countsByCategoryId[category.id] ?? 0,
  }));

  return { products, categories };
}

export async function fetchFeaturedProducts(limit = 6) {
  const { products } = await fetchMarketplaceInventory({ limit });
  return products;
}
