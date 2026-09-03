"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BlogHero from "./BlogHero";
import CategoryFilter from "./CategoryFilter";
import FeaturedBlog from "./FeaturedBlog";
import BlogCard from "./BlogCard";
import { getPublicBlogPage, getPublicCategoryOptions } from "@/lib/api/blog";
import type { BlogPost, Category } from "@/lib/blog-data";
import type { PublicCategoryOption } from "@/types/blog";

type Status = "loading" | "error" | "ready";
const PAGE_SIZE = 10;

export default function BlogPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [querySearch, setQuerySearch] = useState(search);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") ?? "All");
  const [page, setPage] = useState(Number.isFinite(initialPage) && initialPage > 0 ? initialPage : 1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<PublicCategoryOption[]>([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const requestSequence = useRef(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuerySearch(search.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const categoryQuery = searchParams.get("category");
    if (!categoryQuery || categories.length === 0) return;
    const category = categories.find(
      (item) => item.slug === categoryQuery || item.name === categoryQuery,
    );
    if (category) setActiveCategory(category.name);
  }, [categories, searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (querySearch) params.set("search", querySearch);
    if (activeCategory !== "All") {
      const category = categories.find(
        (item) => item.name === activeCategory || item.slug === activeCategory,
      );
      params.set("category", category?.slug ?? activeCategory);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [activeCategory, categories, page, pathname, querySearch, router]);

  useEffect(() => {
    const controller = new AbortController();
    const sequence = ++requestSequence.current;
    setStatus("loading");
    setError(null);
    const selectedCategory = categories.find(
      (item) => item.name === activeCategory || item.slug === activeCategory,
    );

    Promise.all([
      getPublicBlogPage({
        page,
        pageSize: PAGE_SIZE,
        search: querySearch,
        category: selectedCategory?.slug,
      }, controller.signal),
      categories.length === 0 ? getPublicCategoryOptions() : Promise.resolve(categories),
    ])
      .then(([result, categoryOptions]) => {
        if (controller.signal.aborted || sequence !== requestSequence.current) return;
        setPosts(result.posts);
        setPagination({ page: result.page, total: result.total, totalPages: result.totalPages });
        setCategories(categoryOptions);
        setStatus("ready");
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted || sequence !== requestSequence.current) return;
        setError(err instanceof Error ? err.message : "Failed to load articles.");
        setStatus("error");
      });

    return () => controller.abort();
  }, [activeCategory, categories, page, querySearch]);

  const featured = posts[0];
  const filtered = featured ? posts.filter((post) => post.slug !== featured.slug) : [];
  const counts: Record<string, number> = { All: pagination.total };
  if (activeCategory !== "All") counts[activeCategory] = pagination.total;

  function selectCategory(category: string) {
    setActiveCategory(category);
    setPage(1);
  }

  function goToPage(nextPage: number) {
    setPage(Math.min(Math.max(nextPage, 1), pagination.totalPages));
  }

  return (
    <div>
      <BlogHero title="Insights, Strategies & Growth Systems" description="Learn AI automation, lead generation, GTM strategy, and revenue optimization." value={search} onChange={setSearch} />
      <section className="pb-6"><div className="max-w-7xl mx-auto px-4"><CategoryFilter categories={categories.map((category) => category.name as Category)} active={activeCategory} onSelect={selectCategory} counts={counts} /></div></section>
      {status === "loading" && <section className="py-24"><div className="max-w-7xl mx-auto px-4"><p style={{ color: "var(--color-muted)" }}>Loading articles…</p></div></section>}
      {status === "error" && <section className="py-24"><div className="max-w-7xl mx-auto px-4"><p style={{ color: "var(--color-muted)" }}>{error ?? "Something went wrong. Please try again later."}</p></div></section>}
      {status === "ready" && posts.length === 0 && <section className="py-24"><div className="max-w-7xl mx-auto px-4"><p style={{ color: "var(--color-muted)" }}>No articles match your search.</p></div></section>}
      {status === "ready" && posts.length > 0 && <>
        <section className="py-12"><div className="max-w-7xl mx-auto px-4"><FeaturedBlog post={featured} /></div></section>
        <section className="pb-24"><div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tight mb-8" style={{ fontFamily: "var(--font-display)" }}>Latest articles</h2>
          {filtered.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map((post) => <BlogCard key={post.slug} post={post} />)}</div> : <p style={{ color: "var(--color-muted)" }}>No articles match your search.</p>}
          {pagination.totalPages > 1 && <div className="mt-10 flex items-center justify-center gap-4 text-sm"><button type="button" onClick={() => goToPage(page - 1)} disabled={page <= 1} className="px-3 py-2 border disabled:opacity-40" style={{ borderColor: "var(--color-rule)" }}>Previous</button><span style={{ color: "var(--color-muted)" }}>Page {page} of {pagination.totalPages}</span><button type="button" onClick={() => goToPage(page + 1)} disabled={page >= pagination.totalPages} className="px-3 py-2 border disabled:opacity-40" style={{ borderColor: "var(--color-rule)" }}>Next</button></div>}
        </div></section>
      </>}
    </div>
  );
}