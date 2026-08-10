import Link from "next/link";

const menu = [
  { href: "#", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/blog", label: "Blog Posts", icon: "article" },
  { href: "#", label: "Categories", icon: "folder" },
  { href: "#", label: "SEO Settings", icon: "tune" },
];

interface DashboardShellProps {
  children: React.ReactNode;
  active?: string;
}

export default function DashboardShell({ children, active }: DashboardShellProps) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div
            className="sticky top-24 space-y-1 p-4 border"
            style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3 px-3"
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
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
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
          </div>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
