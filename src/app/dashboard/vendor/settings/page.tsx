import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { VENDOR_DASHBOARD_LINKS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProfileForm } from "@/components/forms/profile-form";

export default function VendorSettingsPage() {
  return (
    <DashboardShell sidebarLinks={VENDOR_DASHBOARD_LINKS} title="Settings">
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Weekly payout email</p>
          <p>• New order push alert</p>
          <p>• Commission threshold reminder</p>
        </CardContent>
      </Card>
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Email</span>
            <Badge variant="secondary">Pending</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Phone number</span>
            <Badge variant="secondary">Pending</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Payment details</span>
            <Badge variant="secondary">Setup later</Badge>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
