import type { BlogPost } from "@/lib/blog-data";

interface BlogArticleProps {
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

export default function BlogArticle({ post }: BlogArticleProps) {
  const toc = post.content
    .map((block, index) => ({ ...block, index }))
    .filter((block) => block.type === "h2" || block.type === "h3");

  return (
    <article>
      <header className="mb-10">
        <span
          className="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: "var(--color-paper-3)", color: "var(--color-accent)" }}
        >
          {post.category}
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "var(--color-muted)" }}>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}
            >
              {initials(post.author)}
            </div>
            <span>{post.author}</span>
          </div>
          <span>{post.date}</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      <div
        className="aspect-[21/9] flex items-center justify-center border mb-10"
        style={{
          background: "linear-gradient(135deg, var(--color-paper-3), var(--color-paper))",
          borderColor: "var(--color-rule)",
          borderRadius: "var(--radius-card)",
        }}
      >
        <span className="material-symbols-outlined text-6xl" style={{ color: "var(--color-muted)" }}>
          image
        </span>
      </div>

      <nav
        className="p-6 border mb-10"
        style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}
      >
        <h2
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: "var(--color-ink-2)" }}
        >
          Table of Contents
        </h2>
        <ul className="space-y-2">
          {toc.map((item) => (
            <li key={item.index} className={item.type === "h3" ? "pl-4" : ""}>
              <a
                href={`#section-${item.index}`}
                className="text-sm transition-colors hover:text-accent"
                style={{ color: "var(--color-muted)" }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-8">
        {post.content.map((block, index) => {
          if (block.type === "h2") {
            return (
              <h2
                key={index}
                id={`section-${index}`}
                className="text-2xl md:text-3xl font-bold tracking-tight scroll-mt-32"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === "h3") {
            return (
              <h3
                key={index}
                id={`section-${index}`}
                className="text-xl md:text-2xl font-semibold tracking-tight scroll-mt-32"
                style={{ color: "var(--color-ink-2)" }}
              >
                {block.text}
              </h3>
            );
          }
          return (
            <p
              key={index}
              className="text-lg leading-relaxed"
              style={{ color: "var(--color-ink-2)" }}
            >
              {block.text}
            </p>
          );
        })}
      </div>
    </article>
  );
}
