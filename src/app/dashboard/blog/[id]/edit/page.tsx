import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import EditBlogPageClient from "./EditBlogPageClient";

export const metadata: Metadata = {
  title: "Edit Post | LeadsLemonade",
  description: "Update an SEO article.",
};

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id: idParam } = await params;
  const id = Number.parseInt(idParam, 10);

  return (
    <DashboardShell active="Blog Posts">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Edit Article
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
          Update, optimize, and publish your article.
        </p>
      </div>
      {Number.isSafeInteger(id) && id > 0 ? (
        <EditBlogPageClient id={id} />
      ) : (
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>Article not found.</p>
      )}
    </DashboardShell>
  );
}