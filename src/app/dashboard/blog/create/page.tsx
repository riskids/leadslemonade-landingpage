import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import BlogEditor from "@/components/blog/BlogEditor";

export const metadata: Metadata = {
  title: "Create Post | LeadsLemonade",
  description: "Draft and optimize a new SEO article.",
};

export default function CreateBlogPage() {
  return (
    <DashboardShell active="Blog Posts">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Create Article
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
          Draft, optimize, and preview before publishing.
        </p>
      </div>
      <BlogEditor />
    </DashboardShell>
  );
}
