"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { MarketplaceCategory, MarketplaceProduct } from "@/lib/data/marketplace";
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
};

export function MarketplaceExplorer({ products, categories }: MarketplaceExplorerProps) {
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

  return (
    <div className="space-y-6">
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
