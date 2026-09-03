import type { Metadata } from "next";
import Link from "next/link";
import DashboardShell from "@/components/dashboard/DashboardShell";
import DashboardBlogTable from "./DashboardBlogTable";

export const metadata: Metadata = {
  title: "Blog Dashboard | LeadsLemonade",
  description: "Frontend-only blog management interface for SEO content.",
};

export default function BlogDashboardPage() {
  return (
    <DashboardShell active="Blog Posts">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Blog Posts
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
            Manage your SEO content.
          </p>
        </div>
        <Link
          href="/dashboard/blog/create"
          className="inline-flex min-h-11 items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-opacity hover:opacity-90"
          style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}
        >
          <span className="material-symbols-outlined text-lg">add</span>
          New Post
        </Link>
      </div>

      <div
        className="border overflow-hidden"
        style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}
      >
        <DashboardBlogTable />
      </div>
    </DashboardShell>
  );
}
