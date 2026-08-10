import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col border overflow-hidden transition-colors hover:bg-paper-3"
      style={{
        background: "var(--color-paper-2)",
        borderColor: "var(--color-rule)",
        borderRadius: "var(--radius-card)",
      }}
    >
      <div
        className="aspect-[16/10] flex items-center justify-center border-b"
        style={{
          background: "linear-gradient(135deg, var(--color-paper-3), var(--color-paper))",
          borderColor: "var(--color-rule)",
        }}
      >
        <span
          className="material-symbols-outlined text-4xl transition-transform group-hover:scale-110"
          style={{ color: "var(--color-muted)" }}
        >
          image
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <span
          className="inline-flex w-fit px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3"
          style={{ background: "var(--color-paper-3)", color: "var(--color-accent)" }}
        >
          {post.category}
        </span>
        <h3
          className="text-lg font-bold tracking-tight mb-2 group-hover:text-accent transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {post.title}
        </h3>
        <p className="text-sm line-clamp-3 mb-4 flex-1" style={{ color: "var(--color-muted)" }}>
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-muted)" }}>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
            style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}
          >
            {initials(post.author)}
          </div>
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
