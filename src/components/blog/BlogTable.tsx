import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";

interface BlogTableProps {
  posts: Array<BlogPost & { id: number }>;
  onDelete: (post: BlogPost & { id: number }) => void;
  deletingIds: ReadonlySet<number>;
}

export default function BlogTable({ posts, onDelete, deletingIds }: BlogTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[41%]" />
          <col className="w-[14%]" />
          <col className="w-[11%]" />
          <col className="w-[9%]" />
          <col className="w-[14%]" />
          <col className="w-[11%]" />
        </colgroup>
        <thead>
          <tr className="border-b" style={{ borderColor: "var(--color-rule)" }}>
            <th className="px-5 py-3 font-medium" style={{ color: "var(--color-ink-2)" }}>
              Title
            </th>
            <th className="px-5 py-3 font-medium" style={{ color: "var(--color-ink-2)" }}>
              Category
            </th>
            <th className="px-5 py-3 font-medium" style={{ color: "var(--color-ink-2)" }}>
              Status
            </th>
            <th className="px-5 py-3 text-center font-medium" style={{ color: "var(--color-ink-2)" }}>
              SEO Score
            </th>
            <th className="px-5 py-3 font-medium" style={{ color: "var(--color-ink-2)" }}>
              Updated
            </th>
            <th className="px-5 py-3 text-right font-medium" style={{ color: "var(--color-ink-2)" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="align-middle border-b last:border-0 transition-colors hover:bg-paper-3"
              style={{ borderColor: "var(--color-rule)" }}
            >
              <td className="px-5 py-4 align-middle">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block text-base font-semibold leading-6 break-words transition-colors hover:text-accent"
                  style={{ color: "var(--color-ink)" }}
                >
                  {post.title}
                </Link>
              </td>
              <td className="whitespace-nowrap px-5 py-4 align-middle">
                <span
                  className="px-2 py-1 rounded-full text-xs"
                  style={{ background: "var(--color-paper-3)", color: "var(--color-ink-2)" }}
                >
                  {post.category}
                </span>
              </td>
              <td className="whitespace-nowrap px-5 py-4 align-middle">
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
              <td className="whitespace-nowrap px-5 py-4 text-center align-middle" style={{ color: "var(--color-muted)" }}>
                {post.seoScore}
              </td>
              <td className="whitespace-nowrap px-5 py-4 align-middle" style={{ color: "var(--color-muted)" }}>
                {post.updatedAt}
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-right align-middle">
                <div className="flex items-center justify-end gap-0.5">
                  <Link
                    href={`/dashboard/blog/${post.id}/edit`}
                    aria-label="Edit"
                    className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md transition-colors hover:bg-paper-3"
                  >
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ color: "var(--color-ink-2)" }}
                    >
                      edit
                    </span>
                  </Link>
                  <button
                    type="button"
                    aria-label="Preview"
                    className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md transition-colors hover:bg-paper-3"
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
                    aria-label={deletingIds.has(post.id) ? "Deleting" : "Delete"}
                    disabled={deletingIds.has(post.id)}
                    onClick={() => onDelete(post)}
                    className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-md transition-colors hover:bg-paper-3 disabled:opacity-50"
                  >
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ color: "var(--color-accent-2)" }}
                    >
                      {deletingIds.has(post.id) ? "progress_activity" : "delete"}
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
