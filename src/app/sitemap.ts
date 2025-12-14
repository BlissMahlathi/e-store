import { MetadataRoute } from "next";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inhimstore.co.za";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/marketplace`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/services/cipc-support`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/vendors/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  // Dynamic product pages (if you have product detail pages)
  let productPages: MetadataRoute.Sitemap = [];

  try {
    const supabase = await getSupabaseServerClient();
    const { data: products } = await supabase
      .from("products")
      .select("id, updated_at")
      .eq("is_active", true)
      .limit(1000);

    if (products) {
      productPages = products.map((product) => ({
        url: `${siteUrl}/marketplace/product/${product.id}`,
        lastModified: new Date(product.updated_at || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    // If products table doesn't exist or error, continue without product pages
    console.log("Sitemap: Could not fetch products", error);
  }

  // Dynamic vendor pages (if you have vendor detail pages)
  let vendorPages: MetadataRoute.Sitemap = [];

  try {
    const supabase = await getSupabaseServerClient();
    const { data: vendors } = await supabase
      .from("vendors")
      .select("id, created_at")
      .eq("is_active", true)
      .limit(500);

    if (vendors) {
      vendorPages = vendors.map((vendor) => ({
        url: `${siteUrl}/vendors/${vendor.id}`,
        lastModified: new Date(vendor.created_at || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    // If vendors table doesn't exist or error, continue without vendor pages
    console.log("Sitemap: Could not fetch vendors", error);
  }

  return [...staticPages, ...productPages, ...vendorPages];
}
