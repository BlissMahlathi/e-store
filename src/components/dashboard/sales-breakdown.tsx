"use client";

import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SALES_STREAM } from "@/lib/constants";

export function SalesBreakdown() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">Sales stream</CardTitle>
          <p className="text-xs text-muted-foreground">Live orders grouped by vendor</p>
        </div>
        <TrendingUp className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        {SALES_STREAM.map((entry) => (
          <div key={entry.ref} className="flex items-center justify-between rounded-2xl border border-border/70 p-4">
            <div>
              <p className="text-sm font-medium">{entry.vendor}</p>
              <p className="text-xs text-muted-foreground">
                {entry.ref} · {entry.channel} · {entry.orders} orders
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">R{entry.total.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{entry.status}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
