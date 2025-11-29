"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserRole } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  sidebarLinks: { label: string; href: string }[];
  title: string;
  role?: UserRole;
  children: React.ReactNode;
}

export function DashboardShell({ sidebarLinks, title, children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="grid gap-8 md:grid-cols-[220px_1fr]">
      <aside className="rounded-2xl border border-border/70 bg-card p-4">
        <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Navigation</p>
        <div className="space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-xl px-3 py-2 text-sm transition-colors",
                pathname === link.href
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </aside>
      <section>
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Dashboard</p>
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        <div className="space-y-6">{children}</div>
      </section>
    </div>
  );
}
