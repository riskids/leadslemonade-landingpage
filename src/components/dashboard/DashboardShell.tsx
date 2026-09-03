"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/auth";

const menu = [
  { href: "/dashboard", label: "Overview", icon: "dashboard" },
  { href: "/dashboard/blog", label: "Blog Posts", icon: "article" },
  { href: "/dashboard/categories", label: "Categories", icon: "folder" },
  { href: "/dashboard/seo-settings", label: "SEO Settings", icon: "tune" },
];

interface DashboardShellProps { children: React.ReactNode; active?: string; }

export default function DashboardShell({ children, active }: DashboardShellProps) {
  const router = useRouter();
  async function handleLogout() {
    await logout().catch(() => undefined);
    router.replace("/login");
  }
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6 lg:gap-8">
        <aside>
          <div
            className="lg:sticky lg:top-24 flex lg:block gap-1 overflow-x-auto p-2 sm:p-3 border"
            style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}
          >
            <p
              className="hidden lg:block text-xs font-bold uppercase tracking-widest mb-3 px-3"
              style={{ color: "var(--color-muted)" }}
            >
              Menu
            </p>
            {menu.map((item) => {
              const isActive = active === item.label;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="shrink-0 flex min-h-11 items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-paper-3"
                  style={
                    isActive
                      ? { background: "var(--color-accent)", color: "var(--color-accent-ink)" }
                      : { color: "var(--color-ink-2)" }
                  }
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
            <button type="button" id="dashboard-logout" onClick={handleLogout} className="shrink-0 flex min-h-11 items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-paper-3" style={{ color: "var(--color-ink-2)" }}><span className="material-symbols-outlined text-lg">logout</span>Logout</button>
          </div>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
