"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, COMPANY_NAME, COMPANY_TAGLINE } from "@/lib/constants";
import { useAuth } from "@/components/providers/auth-provider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CartWishlistControls } from "@/components/cart/cart-wishlist-controls";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { role, isAuthenticated, signOut } = useAuth();

  const filteredLinks = NAV_LINKS.filter((link) => !link.roles || link.roles.includes(role));

  const isActiveLink = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight">
              {COMPANY_NAME} Store
            </Link>
            <p className="text-xs text-muted-foreground">{COMPANY_TAGLINE}</p>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <CartWishlistControls className="gap-1" />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Explore {COMPANY_NAME}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Navigate</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {filteredLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "rounded-2xl border px-4 py-3 text-sm font-medium capitalize transition-colors",
                            isActiveLink(link.href)
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Account</p>
                    <div className="mt-3 space-y-2">
                      {isAuthenticated ? (
                        <Button className="w-full" onClick={() => signOut()}>
                          Sign out
                        </Button>
                      ) : (
                        <>
                          <Button asChild className="w-full">
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button variant="outline" asChild className="w-full">
                            <Link href="/register">Create account</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">Vendors</p>
                    <Button variant="secondary" asChild className="mt-3 w-full">
                      <Link href="/vendors/register">Become a vendor</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium capitalize transition-colors",
                isActiveLink(link.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <CartWishlistControls />
          <Button variant="outline" asChild>
            <Link href="/vendors/register">Become a vendor</Link>
          </Button>
          {isAuthenticated ? (
            <Button variant="secondary" onClick={() => signOut()}>
              Sign out
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filteredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm capitalize transition-colors",
                  isActiveLink(link.href)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
