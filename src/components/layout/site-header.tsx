"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, COMPANY_NAME, COMPANY_TAGLINE } from "@/lib/constants";
import { useAuth } from "@/components/providers/auth-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartWishlistControls } from "@/components/cart/cart-wishlist-controls";

export function SiteHeader() {
  const pathname = usePathname();
  const { role, isAuthenticated, signOut } = useAuth();

  const filteredLinks = NAV_LINKS.filter((link) => !link.roles || link.roles.includes(role));

  const navItems = (
    <nav className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
      {filteredLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm capitalize transition-colors ${pathname === link.href || pathname.startsWith(`${link.href}/`) ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div>
          <Link href="/" className="font-semibold tracking-tight">
            {COMPANY_NAME} Store
          </Link>
          <p className="text-xs text-muted-foreground">{COMPANY_TAGLINE}</p>
        </div>
        <div className="hidden flex-1 items-center justify-center md:flex">{navItems}</div>
        <div className="hidden items-center gap-3 md:flex">
          <CartWishlistControls />
          <Button variant="outline" asChild>
            <Link href="/vendors/register">Become a vendor</Link>
          </Button>
          {isAuthenticated ? (
            <Button variant="secondary" onClick={() => signOut()}>Sign out</Button>
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigate</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-6">
                {navItems}
                <CartWishlistControls />
                {isAuthenticated ? (
                  <Button onClick={() => signOut()}>Sign out</Button>
                ) : (
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                )}
                <Button variant="secondary" asChild>
                  <Link href="/vendors/register">Become a vendor</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
