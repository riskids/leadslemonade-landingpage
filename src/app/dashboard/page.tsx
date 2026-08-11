import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

export const metadata: Metadata = {
  title: "Dashboard Overview | LeadsLemonade",
  description: "Overview of LeadsLemonade content and publishing activity.",
};

export default function DashboardPage() {
  return (
    <DashboardShell active="Overview">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Overview
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
          A quick view of your content and publishing activity.
        </p>
      </div>
      <DashboardOverview />
    </DashboardShell>
  );
}