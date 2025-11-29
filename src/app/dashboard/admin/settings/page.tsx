import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ADMIN_DASHBOARD_LINKS, COMPANY_NAME, REGISTRATION_EMAIL } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileForm } from "@/components/forms/profile-form";

export default function AdminSettingsPage() {
  return (
    <DashboardShell sidebarLinks={ADMIN_DASHBOARD_LINKS} title="Settings">
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">My profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">Store profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Store name</label>
            <Input defaultValue={COMPANY_NAME} />
          </div>
          <div>
            <label className="text-sm font-medium">Support email</label>
            <Input type="email" defaultValue={REGISTRATION_EMAIL} />
          </div>
          <Button>Save</Button>
        </CardContent>
      </Card>
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Multi-factor auth required for admin role.</p>
          <p>Audit trail stored for 180 days.</p>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
