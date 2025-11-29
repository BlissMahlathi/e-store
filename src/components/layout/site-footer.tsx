import Link from "next/link";
import { NAV_LINKS, COMPANY_NAME, COMPANY_TAGLINE } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <p className="text-xs">{COMPANY_TAGLINE} · Reg. No. K2018/xxxxx/07</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {NAV_LINKS.filter((link) => !link.roles).map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
