"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const topics = [
  { value: "general", label: "General question" },
  { value: "vendor", label: "Vendor onboarding" },
  { value: "customer", label: "Customer order" },
  { value: "compliance", label: "Compliance & documents" },
];

const urgencies = [
  { value: "normal", label: "Response in 24h" },
  { value: "priority", label: "Need reply today" },
];

type SupportRequestFormProps = {
  supportEmail: string;
};

export function SupportRequestForm({ supportEmail }: SupportRequestFormProps) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    topic: "vendor",
    urgency: "normal",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const isDisabled = useMemo(() => {
    return !form.fullName || !form.email || !form.message;
  }, [form.fullName, form.email, form.message]);

  const handleInputChange = (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isDisabled) return;
    setStatus("sending");

    const subject = encodeURIComponent(`Support: ${form.topic} (${form.urgency})`);
    const body = encodeURIComponent(
      `Name: ${form.fullName}\nEmail: ${form.email}\nTopic: ${form.topic}\nUrgency: ${form.urgency}\n\n${form.message}`,
    );
    const mailtoHref = `mailto:${supportEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoHref;
    setStatus("sent");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="support-full-name">
            Full name
          </label>
          <Input
            id="support-full-name"
            placeholder="Your name"
            value={form.fullName}
            onChange={handleInputChange("fullName")}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="support-email">
            Email address
          </label>
          <Input
            id="support-email"
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={handleInputChange("email")}
            required
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Topic</label>
          <Select value={form.topic} onValueChange={(value) => setForm((prev) => ({ ...prev, topic: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Choose topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic.value} value={topic.value}>
                  {topic.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Urgency</label>
          <Select value={form.urgency} onValueChange={(value) => setForm((prev) => ({ ...prev, urgency: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {urgencies.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="support-message">
          Message
        </label>
        <Textarea
          id="support-message"
          rows={5}
          placeholder="Describe what you need and include any relevant order or vendor IDs."
          value={form.message}
          onChange={handleInputChange("message")}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isDisabled || status === "sending"}>
        {status === "sending" ? "Opening email…" : "Send request"}
      </Button>
      {status === "sent" ? (
        <p className="text-sm text-primary">
          Email draft opened. Please finish sending it from your preferred client so the team receives it.
        </p>
      ) : null}
    </form>
  );
}
