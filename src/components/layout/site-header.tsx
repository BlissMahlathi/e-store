"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronRight,
  Store,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, COMPANY_NAME, COMPANY_TAGLINE } from "@/lib/constants";
import { useAuth } from "@/components/providers/auth-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { CartWishlistControls } from "@/components/cart/cart-wishlist-controls";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { role, isAuthenticated, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredLinks = NAV_LINKS.filter(
    (link) => !link.roles || link.roles.includes(role)
  );

  const isActiveLink = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const closeMenu = () => setIsMenuOpen(false);
  const handleSignOut = () => {
    closeMenu();
    signOut();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="flex items-start justify-between gap-4 md:items-center">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Image
              src="/INHIMStore-logo.png"
              alt={`${COMPANY_NAME} Logo`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-contain"
              priority
            />
            <div className="space-y-0.5">
              <span className="text-lg font-semibold tracking-tight">
                {COMPANY_NAME}
              </span>
              <span className="block text-xs text-muted-foreground">
                {COMPANY_TAGLINE}
              </span>
            </div>
          </Link>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="rounded-full border border-border/60 bg-card/90 px-2 py-1 shadow-sm">
              <CartWishlistControls className="gap-1" />
            </div>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open menu"
                  className="h-10 w-10 rounded-full border-border/70 bg-background/80 shadow-sm transition-all hover:bg-primary/10 hover:border-primary/30"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-full max-w-sm flex-col overflow-hidden border-l border-border/50 bg-background/95 p-0 backdrop-blur-xl"
              >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between border-b border-border/50 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/INHIMStore-logo.png"
                      alt={`${COMPANY_NAME} Logo`}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-lg object-contain"
                    />
                    <div>
                      <SheetTitle className="text-left text-base font-semibold">
                        {COMPANY_NAME}
                      </SheetTitle>
                      <span className="text-xs text-muted-foreground">
                        Menu
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  {/* Navigation Links */}
                  <div className="px-4 py-6">
                    <div className="mb-3 flex items-center gap-2 px-2">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Navigate
                      </span>
                    </div>
                    <nav className="space-y-1.5">
                      {filteredLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMenu}
                          className={cn(
                            "group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium capitalize transition-all duration-200",
                            isActiveLink(link.href)
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-foreground hover:bg-muted/80"
                          )}
                        >
                          <span>{link.label}</span>
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5",
                              isActiveLink(link.href)
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            )}
                          />
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Vendor CTA */}
                  <div className="px-4 pb-4">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                          <Store className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <span className="block text-sm font-semibold text-foreground">
                            Become a Vendor
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            Sell your products to thousands of customers
                          </span>
                        </div>
                      </div>
                      <Button
                        asChild
                        className="mt-4 w-full rounded-xl shadow-sm"
                        size="lg"
                      >
                        <Link href="/vendors/register" onClick={closeMenu}>
                          Get Started
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Account Section */}
                  <div className="px-4 pb-6">
                    <div className="mb-3 flex items-center gap-2 px-2">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Account
                      </span>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-card/50 p-4">
                      {isAuthenticated ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <span className="block text-sm font-medium">
                                Welcome back!
                              </span>
                              <span className="text-xs text-muted-foreground capitalize">
                                {role} account
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full rounded-xl justify-start gap-2"
                            onClick={handleSignOut}
                          >
                            <LogOut className="h-4 w-4" />
                            Sign out
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Button
                            asChild
                            className="w-full rounded-xl justify-start gap-2"
                            size="lg"
                          >
                            <Link href="/login" onClick={closeMenu}>
                              <LogIn className="h-4 w-4" />
                              Login
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            asChild
                            className="w-full rounded-xl justify-start gap-2"
                            size="lg"
                          >
                            <Link href="/register" onClick={closeMenu}>
                              <UserPlus className="h-4 w-4" />
                              Create account
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-border/50 bg-muted/30 px-6 py-4">
                  <span className="text-xs text-muted-foreground">
                    {COMPANY_TAGLINE}
                  </span>
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
      </div>
    </header>
  );
}
