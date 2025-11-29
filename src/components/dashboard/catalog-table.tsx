import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CatalogProduct } from "@/lib/data/dashboard";

type CatalogTableProps = {
  products: CatalogProduct[];
  showVendor?: boolean;
};

export function CatalogTable({ products, showVendor = true }: CatalogTableProps) {
  return (
    <div className="rounded-2xl border border-border/80">
      <Table>
        <TableHeader>
          <TableRow className="text-xs uppercase tracking-widest text-muted-foreground">
            <TableHead>Name</TableHead>
            {showVendor && <TableHead>Vendor</TableHead>}
            <TableHead>Status</TableHead>
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
                <TableCell className="text-right">R{product.price.toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={showVendor ? 4 : 3} className="py-8 text-center text-sm text-muted-foreground">
                No catalog entries yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="border-t border-border/70 p-4 text-right">
        <Button size="sm">Add listing</Button>
      </div>
    </div>
  );
}
