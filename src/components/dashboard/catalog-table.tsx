import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CatalogProduct } from "@/lib/data/dashboard";

type CatalogTableProps = {
  products: CatalogProduct[];
  showVendor?: boolean;
  showActions?: boolean;
  onAddListing?: () => void;
};

const formatCurrency = (value: number) => `R${value.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const formatUpdated = (value: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-ZA", { month: "short", day: "numeric" });
};

export function CatalogTable({ products, showVendor = true, showActions = true, onAddListing }: CatalogTableProps) {
  return (
    <div className="rounded-2xl border border-border/80">
      <Table>
        <TableHeader>
          <TableRow className="text-xs uppercase tracking-widest text-muted-foreground">
            <TableHead>Name</TableHead>
            {showVendor && <TableHead>Vendor</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                {showVendor && <TableCell>{product.vendorName}</TableCell>}
                <TableCell>
                  <Badge variant={product.status === "ready" ? "default" : "outline"}>{product.status}</Badge>
                </TableCell>
                <TableCell>{formatUpdated(product.updatedAt)}</TableCell>
                <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={showVendor ? 5 : 4} className="py-8 text-center text-sm text-muted-foreground">
                No catalog entries yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {showActions ? (
        <div className="border-t border-border/70 p-4 text-right">
          <Button size="sm" onClick={onAddListing}>
            Add listing
          </Button>
        </div>
      ) : null}
    </div>
  );
}
