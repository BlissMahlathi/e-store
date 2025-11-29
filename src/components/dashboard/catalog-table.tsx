import { PRODUCTS } from "@/lib/constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CatalogTable() {
  return (
    <div className="rounded-2xl border border-border/80">
      <Table>
        <TableHeader>
          <TableRow className="text-xs uppercase tracking-widest text-muted-foreground">
            <TableHead>Name</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PRODUCTS.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.vendor}</TableCell>
              <TableCell>
                <Badge variant={product.status === "ready" ? "default" : "outline"}>{product.status}</Badge>
              </TableCell>
              <TableCell className="text-right">R{product.price.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t border-border/70 p-4 text-right">
        <Button size="sm">Add listing</Button>
      </div>
    </div>
  );
}
