import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { UserRole } from "@/lib/constants";
import { ALLOWED_ROLES } from "@/lib/constants";

const protectedRoutes: { matcher: RegExp; allowed: UserRole[] }[] = [
  { matcher: /^\/dashboard\/vendor/i, allowed: ["vendor", "admin"] },
  { matcher: /^\/dashboard\/admin/i, allowed: ["admin"] },
];

export async function middleware(request: NextRequest) {
  const matched = protectedRoutes.find((route) => route.matcher.test(request.nextUrl.pathname));
  if (!matched) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnon) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnon, {
    cookies: {
      getAll() {
        return request.cookies.getAll().map((cookie) => ({ name: cookie.name, value: cookie.value }));
      },
      setAll(cookies) {
        cookies.forEach((cookie) => {
          response.cookies.set({ name: cookie.name, value: cookie.value, ...cookie.options });
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const redirectUrl = new URL(`/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const rawRole = (user.app_metadata?.role ?? user.user_metadata?.role) as UserRole | undefined;
  const role: UserRole = rawRole && ALLOWED_ROLES.includes(rawRole) ? rawRole : "customer";

  if (!user.email_confirmed_at) {
    return NextResponse.redirect(new URL("/not-authorized?reason=verify", request.url));
  }

  if (!matched.allowed.includes(role)) {
    return NextResponse.redirect(new URL("/not-authorized", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
