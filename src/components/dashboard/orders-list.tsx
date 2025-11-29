import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VENDOR_ORDERS } from "@/lib/constants";

type Order = (typeof VENDOR_ORDERS)[number];

type OrdersListProps = {
  title?: string;
  orders?: Order[];
};

const DEFAULT_TITLE = "Recent orders";

export function OrdersList({ title = DEFAULT_TITLE, orders = VENDOR_ORDERS }: OrdersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((order) => (
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
