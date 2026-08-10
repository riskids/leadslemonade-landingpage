import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";

interface BlogTableProps {
  posts: BlogPost[];
}

export default function BlogTable({ posts }: BlogTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b" style={{ borderColor: "var(--color-rule)" }}>
            <th className="py-3 pr-4 font-medium" style={{ color: "var(--color-ink-2)" }}>
              Title
            </th>
            <th className="py-3 pr-4 font-medium" style={{ color: "var(--color-ink-2)" }}>
              Category
            </th>
            <th className="py-3 pr-4 font-medium" style={{ color: "var(--color-ink-2)" }}>
              Status
            </th>
            <th className="py-3 pr-4 font-medium" style={{ color: "var(--color-ink-2)" }}>
              SEO Score
            </th>
            <th className="py-3 pr-4 font-medium" style={{ color: "var(--color-ink-2)" }}>
              Updated
            </th>
            <th className="py-3 text-right font-medium" style={{ color: "var(--color-ink-2)" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.slug}
              className="border-b last:border-0 transition-colors hover:bg-paper-3"
              style={{ borderColor: "var(--color-rule)" }}
            >
              <td className="py-4 pr-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-medium transition-colors hover:text-accent"
                  style={{ color: "var(--color-ink)" }}
                >
                  {post.title}
                </Link>
              </td>
              <td className="py-4 pr-4">
                <span
                  className="px-2 py-1 rounded-full text-xs"
                  style={{ background: "var(--color-paper-3)", color: "var(--color-ink-2)" }}
                >
                  {post.category}
                </span>
              </td>
              <td className="py-4 pr-4">
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={
                    post.status === "Published"
                      ? { background: "var(--color-accent)", color: "var(--color-accent-ink)" }
                      : { background: "var(--color-paper-3)", color: "var(--color-muted)" }
                  }
                >
                  {post.status}
                </span>
              </td>
              <td className="py-4 pr-4" style={{ color: "var(--color-ink-2)" }}>
                {post.seoScore}
              </td>
              <td className="py-4 pr-4" style={{ color: "var(--color-muted)" }}>
                {post.updatedAt}
              </td>
              <td className="py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    type="button"
                    aria-label="Edit"
                    className="p-1.5 rounded-md transition-colors hover:bg-paper-3"
                  >
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ color: "var(--color-ink-2)" }}
                    >
                      edit
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label="Preview"
                    className="p-1.5 rounded-md transition-colors hover:bg-paper-3"
                  >
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ color: "var(--color-ink-2)" }}
                    >
                      visibility
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label="Delete"
                    className="p-1.5 rounded-md transition-colors hover:bg-paper-3"
                  >
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ color: "var(--color-accent-2)" }}
                    >
                      delete
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
