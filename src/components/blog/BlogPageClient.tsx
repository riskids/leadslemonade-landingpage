"use client";

import { useState, useMemo } from "react";
import { posts, categories } from "@/lib/blog-data";
import BlogHero from "./BlogHero";
import CategoryFilter from "./CategoryFilter";
import FeaturedBlog from "./FeaturedBlog";
import BlogCard from "./BlogCard";

export default function BlogPageClient() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = posts[0];

  const filtered = useMemo(() => {
    let list = posts.filter((post) => post.slug !== featured.slug);
    if (activeCategory !== "All") {
      list = list.filter((post) => post.category === activeCategory);
    }
    if (search.trim()) {
      const query = search.toLowerCase();
      list = list.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query)
      );
    }
    return list;
  }, [search, activeCategory, featured.slug]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: posts.length };
    categories.forEach((category) => {
      map[category] = posts.filter((post) => post.category === category).length;
    });
    return map;
  }, []);

  return (
    <div>
      <BlogHero
        title="Insights, Strategies & Growth Systems"
        description="Learn AI automation, lead generation, GTM strategy, and revenue optimization."
        value={search}
        onChange={setSearch}
      />

      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onSelect={setActiveCategory}
            counts={counts}
          />
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <FeaturedBlog post={featured} />
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className="text-2xl font-bold tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Latest articles
          </h2>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--color-muted)" }}>
              No articles match your search.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
