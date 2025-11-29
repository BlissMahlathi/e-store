import { PRODUCTS } from "@/lib/constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const vendors = [
  { name: "Umuzi Atelier", status: "Active", total: 182000 },
  { name: "Luxe Escapes", status: "Review", total: 98000 },
  { name: "Studio Brava", status: "Active", total: 134000 },
];

export function AdminVendorsTable() {
  return (
    <div className="rounded-2xl border border-border/70">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Listings</TableHead>
            <TableHead className="text-right">GMV (6m)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.name}>
              <TableCell className="font-medium">{vendor.name}</TableCell>
              <TableCell>
                <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>{vendor.status}</Badge>
              </TableCell>
              <TableCell>{PRODUCTS.filter((product) => product.vendor === vendor.name).length}</TableCell>
              <TableCell className="text-right">R{vendor.total.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
