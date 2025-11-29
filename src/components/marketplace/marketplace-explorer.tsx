"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type {
  MarketplaceCategory,
  MarketplaceProduct,
  MarketplaceStats,
  MarketplaceVendorSummary,
} from "@/lib/data/marketplace";
import { ProductCard } from "@/components/marketplace/product-card";

const PRICE_SEGMENTS = [
  { id: "all", label: "All prices" },
  { id: "budget", label: "Under R1,000", min: 0, max: 1000 },
  { id: "mid", label: "R1,000 - R5,000", min: 1000, max: 5000 },
  { id: "premium", label: "R5,000+", min: 5000 },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Any status" },
  { value: "ready", label: "Ready" },
  { value: "coming soon", label: "Coming soon" },
];

type MarketplaceExplorerProps = {
  products: MarketplaceProduct[];
  categories: MarketplaceCategory[];
  stats?: MarketplaceStats;
  featuredVendors?: MarketplaceVendorSummary[];
};

export function MarketplaceExplorer({ products, categories, stats, featuredVendors }: MarketplaceExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [priceSegment, setPriceSegment] = useState<string>(PRICE_SEGMENTS[0].id);
  const [statusFilter, setStatusFilter] = useState<string>(STATUS_OPTIONS[0].value);

  const categoryCounts = useMemo(() => {
    return products.reduce<Record<string, number>>((acc, product) => {
      const slug = product.category?.slug;
      if (!slug) return acc;
      acc[slug] = (acc[slug] ?? 0) + 1;
      return acc;
    }, {});
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = [product.name, product.vendorName]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategories.length === 0 || (product.category && activeCategories.includes(product.category.slug));

      const segment = PRICE_SEGMENTS.find((segment) => segment.id === priceSegment);
      const matchesPrice = (() => {
        if (!segment || segment.id === "all") return true;
        const { min, max } = segment;
        const overMin = min !== undefined ? product.price >= min : true;
        const underMax = max !== undefined ? product.price <= max : true;
        return overMin && underMax;
      })();

      const matchesStatus = statusFilter === "all" || product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesPrice && matchesStatus;
    });
  }, [products, searchTerm, activeCategories, priceSegment, statusFilter]);

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((value) => value !== category) : [...prev, category]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setActiveCategories([]);
    setPriceSegment(PRICE_SEGMENTS[0].id);
    setStatusFilter(STATUS_OPTIONS[0].value);
  };

  const formatCurrency = (value: number) => `R${value.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`;

  return (
    <div className="space-y-6">
      {stats ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Listings</CardTitle>
              <p className="text-2xl font-semibold">{stats.totalProducts}</p>
              <p className="text-xs text-muted-foreground">Across {stats.totalCategories} categories</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Vendors</CardTitle>
              <p className="text-2xl font-semibold">{stats.totalVendors}</p>
              <p className="text-xs text-muted-foreground">Registered sellers</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Avg. price</CardTitle>
              <p className="text-2xl font-semibold">{formatCurrency(stats.averagePrice)}</p>
              <p className="text-xs text-muted-foreground">Blended across catalog</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Avg. rating</CardTitle>
              <p className="text-2xl font-semibold">
                {stats.averageRating ? stats.averageRating.toFixed(1) : "–"}
              </p>
              <p className="text-xs text-muted-foreground">Based on verified reviews</p>
            </CardHeader>
          </Card>
        </div>
      ) : null}

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-base">Refine catalog</CardTitle>
          <p className="text-sm text-muted-foreground">Search, segment, and stack category filters to get to the right offer faster.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 space-y-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Search</p>
              <Input
                placeholder="Search by product or vendor"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Status</p>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Categories</p>
                  <p className="text-sm text-muted-foreground">Tap to include a segment</p>
                </div>
                <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
                  Reset
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const count = categoryCounts[category.slug] ?? category.productCount;
                  const isActive = activeCategories.includes(category.slug);
                  return (
                    <Button
                      key={category.id}
                      type="button"
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCategory(category.slug)}
                      className="flex items-center gap-2"
                      disabled={count === 0}
                    >
                      <span>{category.label}</span>
                      <Badge variant={isActive ? "secondary" : "outline"}>{count}</Badge>
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Price band</p>
              <Select value={priceSegment} onValueChange={setPriceSegment}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Price band" />
                </SelectTrigger>
                <SelectContent>
                  {PRICE_SEGMENTS.map((segment) => (
                    <SelectItem key={segment.id} value={segment.id}>
                      {segment.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> of {products.length} curated listings
        </p>
        {activeCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs">
            {activeCategories.map((category) => (
              <Badge key={category} variant="secondary" className="flex items-center gap-1">
                {category}
                <button
                  type="button"
                  className="text-[10px] leading-none"
                  onClick={() => toggleCategory(category)}
                >
                  ✕
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {featuredVendors && featuredVendors.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Featured vendors</CardTitle>
            <p className="text-sm text-muted-foreground">Top contributors ranked by listing volume.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {featuredVendors.map((vendor) => (
              <div key={vendor.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 p-4">
                <div>
                  <p className="text-sm font-medium">{vendor.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant={vendor.status === "active" ? "default" : "secondary"}>{vendor.status}</Badge>
                    <span>
                      {vendor.listingCount} listing{vendor.listingCount === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Avg. price</p>
                  <p className="text-base font-semibold">{formatCurrency(vendor.averagePrice)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            No listings match that combination yet. Try resetting filters or exploring another category.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
