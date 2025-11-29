import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CUSTOMERS = [
  { name: "Ayanda D.", orders: 18, value: 18999, loyalty: "Gold" },
  { name: "Faith M.", orders: 9, value: 7200, loyalty: "Silver" },
  { name: "Daniel P.", orders: 4, value: 3100, loyalty: "Bronze" },
];

export function AdminCustomersTable() {
  return (
    <div className="rounded-2xl border border-border/70">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Loyalty</TableHead>
            <TableHead className="text-right">Spend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {CUSTOMERS.map((customer) => (
            <TableRow key={customer.name}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.orders}</TableCell>
              <TableCell>{customer.loyalty}</TableCell>
              <TableCell className="text-right">R{customer.value.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
