import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import SeoSettingsForm from "./SeoSettingsForm";

export const metadata: Metadata = {
  title: "SEO Settings | LeadsLemonade",
  description: "Manage global SEO defaults for LeadsLemonade.",
};

export default function SeoSettingsPage() {
  return (
    <DashboardShell active="SEO Settings">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          SEO Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
          Set safe defaults for pages without custom SEO values.
        </p>
      </div>
      <SeoSettingsForm />
    </DashboardShell>
  );
}