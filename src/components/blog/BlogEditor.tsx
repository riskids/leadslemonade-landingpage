"use client";

import { useState, useMemo } from "react";
import SEOScoreCard from "./SEOScoreCard";
import SEOChecklist from "./SEOChecklist";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [content, setContent] = useState("");

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
    "w-full px-4 py-2.5 border text-sm focus:outline-none focus:ring-2 transition-colors";
  const inputStyle = {
    background: "var(--color-paper)",
    borderColor: "var(--color-rule)",
    borderRadius: "var(--radius-input)",
    color: "var(--color-ink)",
    "--tw-ring-color": "var(--color-accent)",
  } as React.CSSProperties;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
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

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            className="px-5 py-2.5 text-sm font-medium rounded-full transition-opacity hover:opacity-90"
            style={{ background: "var(--color-paper-3)", color: "var(--color-ink)" }}
          >
            Save Draft
          </button>
          <button
            type="button"
            className="px-5 py-2.5 text-sm font-medium rounded-full transition-opacity hover:opacity-90"
            style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}
          >
            Publish
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

