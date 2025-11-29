import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ORDERS = [
  { id: "#1845", item: "Smart Garden Kit", customer: "Zinzi Q.", value: 2599, status: "Paid" },
  { id: "#1844", item: "Brand Identity Sprint", customer: "Musa L.", value: 4999, status: "In review" },
  { id: "#1843", item: "Mobile Bar Experience", customer: "Sipho P.", value: 2499, status: "Fulfilled" },
];

export function OrdersList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ORDERS.map((order) => (
          <div key={order.id} className="flex items-center justify-between rounded-2xl border border-border/70 p-4">
            <div>
              <p className="text-sm font-medium">{order.item}</p>
              <p className="text-xs text-muted-foreground">
                {order.id} · {order.customer}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">R{order.value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{order.status}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
