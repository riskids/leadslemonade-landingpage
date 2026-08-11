import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import CategoryManagement from "./CategoryManagement";

export const metadata: Metadata = {
  title: "Categories | LeadsLemonade",
  description: "Manage blog categories for LeadsLemonade content.",
};

export default function CategoriesPage() {
  return (
    <DashboardShell active="Categories">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Categories
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
          Organize your blog content with reusable categories.
        </p>
      </div>
      <CategoryManagement />
    </DashboardShell>
  );
}