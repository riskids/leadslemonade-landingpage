import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";

interface RelatedArticlesProps {
  posts: BlogPost[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  return (
    <aside className="space-y-8">
      <div>
        <h3
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: "var(--color-ink-2)" }}
        >
          Related Articles
        </h3>
        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-4 border transition-colors hover:bg-paper-2"
              style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}
            >
              <span
                className="text-xs font-medium"
                style={{ color: "var(--color-accent)" }}
              >
                {post.category}
              </span>
              <p className="font-medium mt-1 transition-colors group-hover:text-accent">
                {post.title}
              </p>
              <span className="text-xs mt-2 block" style={{ color: "var(--color-muted)" }}>
                {post.readingTime}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div
        className="p-6 border"
        style={{
          background: "var(--color-paper-2)",
          borderColor: "var(--color-rule)",
          borderRadius: "var(--radius-card)",
        }}
      >
        <h4 className="font-bold mb-1">Growth Systems Weekly</h4>
        <p className="text-sm mb-4" style={{ color: "var(--color-muted)" }}>
          One tactical email every Friday.
        </p>
        <input
          type="email"
          placeholder="you@company.com"
          className="w-full px-3 py-2 border text-sm mb-2 focus:outline-none focus:ring-2"
          style={{
            background: "var(--color-paper)",
            borderColor: "var(--color-rule)",
            borderRadius: "var(--radius-input)",
            color: "var(--color-ink)",
            "--tw-ring-color": "var(--color-accent)",
          } as React.CSSProperties}
        />
        <button
          type="button"
          className="w-full px-3 py-2 text-sm font-medium rounded-full transition-opacity hover:opacity-90"
          style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}
        >
          Subscribe
        </button>
      </div>
    </aside>
  );
}
