"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import SEOScoreCard from "./SEOScoreCard";
import SEOChecklist from "./SEOChecklist";
import { createBlogPost, getCategoryOptions, updateBlogPost } from "@/lib/api/blog";
import type { Category } from "@/types/blog";
import type { BlogPost, BlogPostStatus } from "@/types/blog";

interface BlogEditorProps {
  post?: BlogPost;
}

export default function BlogEditor({ post }: BlogEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [author, setAuthor] = useState(post?.author ?? "Lead Lemonade");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [categoryId, setCategoryId] = useState(post ? String(post.categoryId) : "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription ?? "");
  const [keywords, setKeywords] = useState(post?.keywords.join(", ") ?? "");
  const [imageAlt, setImageAlt] = useState("");
  const [content, setContent] = useState(post?.content ?? "");
  const [submitStatus, setSubmitStatus] = useState<BlogPostStatus | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getCategoryOptions()
      .then((options) => {
        if (cancelled) return;
        setCategories(options);
        if (!post && options.length > 0) setCategoryId(String(options[0].id));
      })
      .catch((err) => {
        if (cancelled) return;
        setCategoryError(err instanceof Error ? err.message : "Unable to load categories.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(status: BlogPostStatus) {
    if (submitStatus) return;
    setSubmitError(null);

    if (!title.trim() || !slug.trim() || !excerpt.trim() || !content.trim() || !author.trim() || !categoryId) {
      setSubmitError("Title, slug, excerpt, content, author, and category are required.");
      return;
    }

    setSubmitStatus(status);
    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content,
        coverImage: coverImage.trim() || undefined,
        categoryId: Number(categoryId),
        author: author.trim(),
        status,
        metaTitle: metaTitle.trim(),
        metaDescription: metaDescription.trim(),
        keywords: keywords
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean),
      };
      if (post) {
        await updateBlogPost(post.id, payload);
      } else {
        await createBlogPost(payload);
      }
      router.push("/dashboard/blog");
    } catch (err) {
      setSubmitStatus(null);
      setSubmitError(err instanceof Error ? err.message : `Unable to ${post ? "update" : "create"} blog post.`);
    }
  }

  const checks = useMemo(
    () => [
      {
        label: "Title optimization",
        passed: title.length >= 30 && title.length <= 60,
      },
      {
        label: "Meta description",
        passed: metaDescription.length >= 120 && metaDescription.length <= 160,
      },
      {
        label: "Keyword usage",
        passed:
          keywords.trim().length > 0 &&
          content.toLowerCase().includes(keywords.split(",")[0].trim().toLowerCase()),
      },
      { label: "Image alt text", passed: imageAlt.trim().length > 0 },
      {
        label: "Internal linking",
        passed: content.includes("/blog/"),
      },
    ],
    [title, metaDescription, keywords, imageAlt, content]
  );

  const score = useMemo(
    () => Math.round((checks.filter((c) => c.passed).length / checks.length) * 100),
    [checks]
  );

  const inputClass =
    "w-full min-h-11 px-4 py-2.5 border text-sm focus:outline-none focus:ring-2 transition-colors disabled:cursor-not-allowed disabled:opacity-60";
  const inputStyle = {
    background: "var(--color-paper)",
    borderColor: "var(--color-rule)",
    borderRadius: "var(--radius-input)",
    color: "var(--color-ink)",
    "--tw-ring-color": "var(--color-accent)",
  } as React.CSSProperties;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-8 items-start">
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="How AI Automation Replaces 80% of SDR Work"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="excerpt" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A short summary of the article"
            rows={3}
            className={`${inputClass} resize-none`}
            style={inputStyle}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="author" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
              Author
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="category" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
              Category
            </label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={categories.length === 0}
              className={inputClass}
              style={inputStyle}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {categoryError && <p className="text-xs" style={{ color: "var(--color-muted)" }}>{categoryError}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="slug" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
            Slug
          </label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ai-automation-replaces-sdr-work"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <section className="space-y-6 border-t pt-6" style={{ borderColor: "var(--color-rule)" }}>
          <div>
            <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>Search optimization</h2>
            <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>Fine-tune how this article appears in search results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="metaTitle" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
                Meta title
              </label>
              <input
                id="metaTitle"
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="AI Automation for SDRs | LeadsLemonade"
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="keywords" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
                SEO keywords
              </label>
              <input
                id="keywords"
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="ai automation, sdr, lead generation"
                className={inputClass}
                style={inputStyle}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="metaDescription" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
              Meta description
            </label>
            <textarea
              id="metaDescription"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Learn how top GTM teams use AI automation to replace repetitive SDR tasks and scale outbound."
              rows={3}
              className={`${inputClass} resize-none`}
              style={inputStyle}
            />
          </div>
        </section>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
            Featured image
          </label>
          <button
            type="button"
            className="w-full flex flex-col items-center justify-center gap-3 px-6 py-10 border border-dashed transition-colors hover:bg-paper-2"
            style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}
          >
            <span className="material-symbols-outlined text-4xl" style={{ color: "var(--color-muted)" }}>
              cloud_upload
            </span>
            <span className="text-sm" style={{ color: "var(--color-muted)" }}>
              Click to upload featured image
            </span>
          </button>
          <input
            aria-label="Featured image URL"
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Featured image URL (optional)"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="imageAlt" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
            Image alt text
          </label>
          <input
            id="imageAlt"
            type="text"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            placeholder="Describe the featured image"
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write article content... (include /blog/ links for internal linking)"
            rows={14}
            className={`${inputClass} resize-none font-mono`}
            style={{ ...inputStyle, fontFamily: "var(--font-label)" }}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 border-t pt-6" style={{ borderColor: "var(--color-rule)" }}>
          {submitError && (
            <p className="basis-full text-sm" style={{ color: "var(--color-muted)" }}>
              {submitError}
            </p>
          )}
          <button
            type="button"
            onClick={() => handleSubmit("DRAFT")}
            disabled={submitStatus !== null}
            aria-busy={submitStatus === "DRAFT"}
            className="min-h-11 px-5 py-2.5 text-sm font-medium rounded-full transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: "var(--color-paper-3)", color: "var(--color-ink)" }}
          >
            {submitStatus === "DRAFT" ? "Saving..." : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("PUBLISHED")}
            disabled={submitStatus !== null}
            aria-busy={submitStatus === "PUBLISHED"}
            className="min-h-11 px-5 py-2.5 text-sm font-medium rounded-full transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}
          >
            {submitStatus === "PUBLISHED" ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="space-y-6 lg:sticky lg:top-24">
        <SEOScoreCard score={score} />
        <SEOChecklist items={checks} />

        <div
          className="p-5 border"
          style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}
        >
          <h4
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "var(--color-ink-2)" }}
          >
            SEO Preview
          </h4>
          <div className="space-y-1">
            <p className="text-xs truncate" style={{ color: "var(--color-ink-2)" }}>
              https://leadslemonade.com/blog/{slug || "your-slug"}
            </p>
            <p className="text-lg leading-tight" style={{ color: "var(--color-accent)" }}>
              {metaTitle || title || "Page title"}
            </p>
            <p className="text-sm line-clamp-2" style={{ color: "var(--color-muted)" }}>
              {metaDescription || "No meta description yet. Add one to improve click-through rate."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

