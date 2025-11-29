import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { SupabaseProvider } from "@/components/providers/supabase-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieConsent } from "@/components/cookie-consent";
import { EmailVerificationBanner } from "@/components/alerts/email-verification-banner";
import { COMPANY_NAME, COMPANY_TAGLINE } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${COMPANY_NAME} Store | Secure multi-vendor commerce`,
  description: `${COMPANY_NAME} (${COMPANY_TAGLINE}) powers a secure multi-vendor marketplace with commissions, vendor onboarding, and CIPC support services.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased`}>
        <SupabaseProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <EmailVerificationBanner />
              <main className="flex-1 bg-background">
                <div className="mx-auto w-full max-w-6xl px-4 py-10">{children}</div>
              </main>
              <SiteFooter />
            </div>
            <CookieConsent />
          </AuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
