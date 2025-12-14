import { Metadata } from "next";
import {
  CalendarClock,
  Mail,
  MessageSquare,
  PhoneCall,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  COMPANY_NAME,
  COMPANY_TAGLINE,
  REGISTRATION_EMAIL,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_DIAL,
  SUPPORT_WHATSAPP_URL,
} from "@/lib/constants";
import { SupportRequestForm } from "@/components/support/support-request-form";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://inhimstore.co.za";

export const metadata: Metadata = {
  title: "Customer Support | Contact Us | Help Center",
  description:
    "Get help from INHIMStore's dedicated support team. Contact us via phone, email, or WhatsApp. Speak directly with our directors. Fast response times for vendors and customers alike.",
  keywords: [
    "INHIMStore support",
    "contact us",
    "customer service South Africa",
    "help center",
    "vendor support",
    "phone support",
    "WhatsApp support",
    "e-commerce help",
  ],
  openGraph: {
    title: "Customer Support | INHIMStore Help Center",
    description:
      "Get help from our dedicated team. Contact us via phone, email, or WhatsApp.",
    url: `${siteUrl}/support`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Customer Support | INHIMStore",
    description: "Need help? Our team is here for you.",
  },
  alternates: {
    canonical: `${siteUrl}/support`,
  },
};

type SupportChannel = {
  title: string;
  description: string;
  action: string;
  href: string;
  icon: LucideIcon;
  secondaryAction?: string;
  secondaryHref?: string;
  secondaryIcon?: LucideIcon;
};

const channels: SupportChannel[] = [
  {
    title: "Email Bliss (Director)",
    description:
      "Reach the decision-maker directly for escalations, compliance, and partnership approvals.",
    action: "Email Bliss",
    href: `mailto:${REGISTRATION_EMAIL}?subject=Director%20support%20request`,
    icon: Mail,
  },
  {
    title: "Vendor desk (Cynthia)",
    description:
      "Questions about onboarding, catalog prep, or fulfilment rehearsals go straight to Cynthia.",
    action: "Message Cynthia",
    href: `mailto:${REGISTRATION_EMAIL}?subject=Vendor%20desk%20-%20attention%20Cynthia`,
    icon: MessageSquare,
  },
  {
    title: "Schedule onboarding call",
    description:
      "Request a 30-minute session to review paperwork, payouts, or product strategy.",
    action: "Request a slot",
    href: `mailto:${REGISTRATION_EMAIL}?subject=Schedule%20onboarding%20call&body=Please%20share%20two%20time%20slots%20that%20suit%20you.`,
    icon: CalendarClock,
  },
  {
    title: "Call Cynthia directly",
    description: `Phone line for urgent vendor or customer matters. Number: ${SUPPORT_PHONE_DISPLAY}.`,
    action: "Call now",
    href: `tel:${SUPPORT_PHONE_DIAL}`,
    icon: PhoneCall,
    secondaryAction: "Text or WhatsApp",
    secondaryHref: SUPPORT_WHATSAPP_URL,
    secondaryIcon: Smartphone,
  },
];

const faqs = [
  {
    q: "When does INHIMStore start operating?",
    a: "Pilot testing runs through the end of this year, and public checkout opens January 2026 once fulfilment and payouts meet our benchmarks.",
  },
  {
    q: "Who will answer my support request?",
    a: "Either Bliss (director) or Cynthia (store manager) personally replies—no outsourced call centers.",
  },
  {
    q: "How fast are payouts once we launch?",
    a: "Weekly Friday settlements with manual overrides for priority vendors during the pilot phase.",
  },
  {
    q: "Do you support both products and services?",
    a: "Yes. We curate tangible goods, services, and experiences as long as the vendor can meet our delivery guarantees.",
  },
];

export default function SupportPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Help center
        </p>
        <h1 className="text-4xl font-semibold">
          Support for every launch stage
        </h1>
        <p className="text-muted-foreground md:w-3/4">
          {COMPANY_NAME} is in pilot, so your messages go straight to
          leadership. Use the quick links below or send a detailed
          request—either way, you will hear back within one business day.
        </p>
        <p className="text-xs text-muted-foreground">
          {COMPANY_TAGLINE} · Primary inbox: {REGISTRATION_EMAIL} · Phone /
          WhatsApp: {SUPPORT_PHONE_DISPLAY}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {channels.map((channel) => {
          const Icon = channel.icon;
          const SecondaryIcon = channel.secondaryIcon;
          return (
            <Card key={channel.title} className="border-border/70">
              <CardHeader className="space-y-3">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <Icon className="h-4 w-4" />
                  {channel.title}
                </span>
                <CardTitle className="text-xl">{channel.action}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>{channel.description}</p>
                <Button asChild className="w-full" variant="secondary">
                  <a href={channel.href}>Start here</a>
                </Button>
                {channel.secondaryHref ? (
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href={channel.secondaryHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {SecondaryIcon ? (
                        <SecondaryIcon className="mr-2 h-4 w-4" />
                      ) : null}
                      {channel.secondaryAction}
                    </a>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Send a detailed request</CardTitle>
            <p className="text-sm text-muted-foreground">
              This form opens a pre-filled email so you can attach documents
              before sending to our support inbox.
            </p>
          </CardHeader>
          <CardContent>
            <SupportRequestForm supportEmail={REGISTRATION_EMAIL} />
          </CardContent>
        </Card>
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>Response times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Weekdays 08:00 – 18:00 SAST · Weekends for urgent payout matters
              only.
            </p>
            <p>
              Average reply: under 6 hours during the pilot, under 24 hours
              post-launch.
            </p>
            <p>
              Escalations go straight to Bliss if a request waits longer than 24
              hours.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            FAQ
          </p>
          <h2 className="text-2xl font-semibold">Answers before you email</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((item) => (
            <Card key={item.q} className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">{item.q}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {item.a}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
