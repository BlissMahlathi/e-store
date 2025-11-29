"use client";

import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SalesStreamEntry } from "@/lib/data/dashboard";

type SalesBreakdownProps = {
  entries: SalesStreamEntry[];
  title?: string;
  helper?: string;
};

const DEFAULT_TITLE = "Sales stream";
const DEFAULT_HELPER = "Live orders grouped by vendor";

const formatTotal = (value: number) => `R${value.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function SalesBreakdown({ entries, title = DEFAULT_TITLE, helper = DEFAULT_HELPER }: SalesBreakdownProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <p className="text-xs text-muted-foreground">{helper}</p>
        </div>
        <TrendingUp className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div key={entry.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 p-4">
              <div>
                <p className="text-sm font-medium">{entry.vendor}</p>
                <p className="text-xs text-muted-foreground">
                  {entry.ref} · {entry.channel} · {entry.orders} {entry.orders === 1 ? "order" : "orders"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatTotal(entry.total)}</p>
                <p className="text-xs text-muted-foreground">{entry.status}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
            No live sales data yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
