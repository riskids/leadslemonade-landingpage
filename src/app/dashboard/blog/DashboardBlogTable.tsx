"use client";

import { useEffect, useRef, useState } from "react";
import BlogTable from "@/components/blog/BlogTable";
import { deleteBlogPost, getDashboardBlogs } from "@/lib/api/blog";
import type { DashboardBlogPost } from "@/lib/api/blog";

type LoadState = "loading" | "ready" | "error";

export default function DashboardBlogTable() {
  const [posts, setPosts] = useState<DashboardBlogPost[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(() => new Set());
  const deletingIdsRef = useRef(new Set<number>());

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        const blogPosts = await getDashboardBlogs();
        if (cancelled) return;
        setPosts(blogPosts);
        setState("ready");
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Unable to load blog posts.");
        setState("error");
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(post: DashboardBlogPost) {
    if (deletingIdsRef.current.has(post.id)) return;

    const confirmed = window.confirm(
      `Permanently delete “${post.title}”? This action cannot be undone.`,
    );
    if (!confirmed) return;

    deletingIdsRef.current.add(post.id);
    setDeletingIds(new Set(deletingIdsRef.current));
    setError(null);

    try {
      await deleteBlogPost(post.id);
      setPosts((currentPosts) => currentPosts.filter(({ id }) => id !== post.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete blog post.");
    } finally {
      deletingIdsRef.current.delete(post.id);
      setDeletingIds(new Set(deletingIdsRef.current));
    }
  }

  if (state === "loading") {
    return (
        <div className="p-8 text-center text-sm" role="status" style={{ color: "var(--color-muted)" }}>
        Loading blog posts...
      </div>
    );
  }

  if (state === "error") {
    return (
        <div className="p-8 text-center text-sm" role="alert" style={{ color: "var(--color-accent-2)" }}>
        {error ?? "Unable to load blog posts."}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
        <div className="p-8 text-center text-sm" style={{ color: "var(--color-muted)" }}>
        No blog posts found.
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="border-b px-5 py-3 text-sm" role="alert" style={{ borderColor: "var(--color-rule)", color: "var(--color-accent-2)" }}>
          {error}
        </div>
      )}
      <BlogTable posts={posts} onDelete={handleDelete} deletingIds={deletingIds} />
    </>
  );
}