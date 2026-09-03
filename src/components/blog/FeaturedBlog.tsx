import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";

interface FeaturedBlogProps {
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

export default function FeaturedBlog({ post }: FeaturedBlogProps) {
  return (
    <article
      className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 border"
      style={{
        background: "var(--color-paper-2)",
        borderColor: "var(--color-rule)",
        borderRadius: "var(--radius-card)",
      }}
    >
      <div
        className="aspect-[16/10] flex items-center justify-center border"
        style={{
          background: "linear-gradient(135deg, var(--color-paper-3), var(--color-paper))",
          borderColor: "var(--color-rule)",
          borderRadius: "var(--radius-card)",
        }}
      >
        <span className="material-symbols-outlined text-5xl" style={{ color: "var(--color-muted)" }}>
          image
        </span>
      </div>

      <div className="flex flex-col justify-center">
        <span
          className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: "var(--color-paper-3)", color: "var(--color-accent)" }}
        >
          {post.category}
        </span>
        <h2
          className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {post.title}
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: "var(--color-muted)" }}>
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3 text-sm mb-6">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}
          >
            {initials(post.author)}
          </div>
          <span style={{ color: "var(--color-ink-2)" }}>{post.author}</span>
          <span style={{ color: "var(--color-muted)" }}>·</span>
          <span style={{ color: "var(--color-muted)" }}>{post.date}</span>
          <span style={{ color: "var(--color-muted)" }}>·</span>
          <span style={{ color: "var(--color-muted)" }}>{post.readingTime}</span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80 w-fit"
          style={{ color: "var(--color-accent)" }}
        >
          Read article
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </Link>
      </div>
    </article>
  );
}
