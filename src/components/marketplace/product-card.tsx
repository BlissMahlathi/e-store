"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckoutButton } from "@/components/checkout-button";
import type { Product } from "@/lib/constants";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <Card className="flex flex-col border-border/70">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{product.name}</CardTitle>
          <Badge variant={product.category === "Services" ? "secondary" : "default"}>{product.category}</Badge>
        </div>
        <p className="text-xs uppercase text-muted-foreground">{product.vendor}</p>
      </CardHeader>
      <CardContent className="mt-auto space-y-3">
        <p className="text-2xl font-semibold">R{product.price.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">Rating {product.rating} / 5</p>
        <CheckoutButton />
      </CardContent>
    </Card>
  );
}
