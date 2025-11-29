import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardOrder } from "@/lib/data/dashboard";

type OrdersListProps = {
  title?: string;
  orders: DashboardOrder[];
  emptyLabel?: string;
};

const DEFAULT_TITLE = "Recent orders";

const formatRand = (value: number) => `R${value.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function OrdersList({ title = DEFAULT_TITLE, orders, emptyLabel = "No orders yet." }: OrdersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 p-4">
              <div>
                <p className="text-sm font-medium">{order.orderNumber}</p>
                <p className="text-xs text-muted-foreground">
                  {order.customer}
                  {order.placedAt ? ` · ${new Date(order.placedAt).toLocaleDateString("en-ZA")}` : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatRand(order.value)}</p>
                <p className="text-xs text-muted-foreground">{order.status}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">{emptyLabel}</div>
        )}
      </CardContent>
    </Card>
  );
}
