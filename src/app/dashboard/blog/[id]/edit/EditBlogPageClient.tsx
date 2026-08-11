"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BlogEditor from "@/components/blog/BlogEditor";
import { getBlogById } from "@/lib/api/blog";
import type { BlogPost } from "@/types/blog";

interface EditBlogPageClientProps {
  id: number;
}

export default function EditBlogPageClient({ id }: EditBlogPageClientProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getBlogById(id)
      .then((result) => {
        if (cancelled) return;
        if (!result) setError("Article not found.");
        else setPost(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unable to load article.");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="text-sm" style={{ color: "var(--color-muted)" }}>
        <p>{error}</p>
        <Link href="/dashboard/blog" className="inline-block mt-3 underline">Back to Blog Posts</Link>
      </div>
    );
  }

  if (!post) {
    return <div className="text-sm" style={{ color: "var(--color-muted)" }}>Loading article...</div>;
  }

  return <BlogEditor post={post} />;
}