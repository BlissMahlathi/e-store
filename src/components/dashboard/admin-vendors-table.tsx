import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { AdminVendorSummary } from "@/lib/data/dashboard";

type AdminVendorsTableProps = {
  vendors: AdminVendorSummary[];
};

const formatRand = (value: number) => `R${value.toLocaleString("en-ZA", { maximumFractionDigits: 0 })}`;

export function AdminVendorsTable({ vendors }: AdminVendorsTableProps) {
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
          {vendors.length > 0 ? (
            vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">{vendor.name}</TableCell>
                <TableCell>
                  <Badge variant={vendor.status.toLowerCase() === "active" ? "default" : "secondary"}>{vendor.status}</Badge>
                </TableCell>
                <TableCell>{vendor.listingCount}</TableCell>
                <TableCell className="text-right">{formatRand(vendor.gmv)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                No vendors onboarded yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
