"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategoryOptions, getDashboardBlogs } from "@/lib/api/blog";
import type { DashboardBlogPost } from "@/lib/api/blog";

type LoadState = "loading" | "ready" | "error";

export default function DashboardOverview() {
  const [posts, setPosts] = useState<DashboardBlogPost[]>([]);
  const [categoryCount, setCategoryCount] = useState(0);
  const [state, setState] = useState<LoadState>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getDashboardBlogs(), getCategoryOptions()])
      .then(([blogPosts, categories]) => {
        if (cancelled) return;
        setPosts(blogPosts);
        setCategoryCount(categories.length);
        setState("ready");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Unable to load dashboard data.");
        setState("error");
      });
    return () => { cancelled = true; };
  }, []);

  if (state === "loading") return <div className="border p-6 text-sm" style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)", color: "var(--color-muted)" }}>Loading overview...</div>;
  if (state === "error") return <div className="border p-6 text-sm" role="alert" style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)", color: "var(--color-accent-2)" }}>{error}</div>;

  const published = posts.filter((post) => post.status === "Published").length;
  const drafts = posts.filter((post) => post.status === "Draft").length;
  const cards = [
    ["Total Posts", posts.length, "article"],
    ["Published Posts", published, "public"],
    ["Draft Posts", drafts, "edit_note"],
    ["Categories", categoryCount, "folder"],
  ] as const;

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map(([label, value, icon]) => (
          <div key={label} className="border p-5" style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm" style={{ color: "var(--color-muted)" }}>{label}</span>
              <span className="material-symbols-outlined" style={{ color: "var(--color-accent)" }}>{icon}</span>
            </div>
            <p className="text-3xl font-bold mt-4" style={{ fontFamily: "var(--font-display)" }}>{value}</p>
          </div>
        ))}
      </section>

      <section className="border overflow-hidden" style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}>
        <div className="flex items-center justify-between gap-4 p-5 border-b" style={{ borderColor: "var(--color-rule)" }}>
          <div>
            <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Recent Posts</h2>
            <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>Your latest content updates.</p>
          </div>
          <Link href="/dashboard/blog" className="shrink-0 rounded-md text-sm font-medium underline-offset-4 hover:underline" style={{ color: "var(--color-accent)" }}>View all</Link>
        </div>
        {posts.length === 0 ? <p className="p-5 text-sm" style={{ color: "var(--color-muted)" }}>No blog posts found.</p> : (
          <div className="divide-y" style={{ borderColor: "var(--color-rule)" }}>
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5">
                <div className="min-w-0"><Link href={`/dashboard/blog/${post.id}/edit`} className="font-medium hover:underline">{post.title}</Link><p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>{post.category} · {post.date}</p></div>
                <span className="shrink-0 w-fit px-2 py-1 rounded-full text-xs font-medium" style={post.status === "Published" ? { background: "var(--color-accent)", color: "var(--color-accent-ink)" } : { background: "var(--color-paper-3)", color: "var(--color-muted)" }}>{post.status}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}