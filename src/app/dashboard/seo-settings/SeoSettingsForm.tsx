"use client";

import { useEffect, useRef, useState } from "react";
import { getSeoSettings, updateSeoSettings } from "@/lib/api/blog";
import { getSiteUrlString } from "@/lib/site";

type FormState = {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultSocialImage: string;
};

const emptyForm: FormState = { siteName: "", defaultTitle: "", defaultDescription: "", defaultSocialImage: "" };
const inputClass = "w-full min-h-11 border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60";
const inputStyle = { borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)", background: "var(--color-paper)" };

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function SeoSettingsForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const savingRef = useRef(false);
  const siteUrl = getSiteUrlString();

  useEffect(() => {
    let cancelled = false;
    getSeoSettings()
      .then((settings) => {
        if (cancelled) return;
        setForm({ ...settings, defaultSocialImage: settings.defaultSocialImage ?? "" });
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(errorMessage(err, "Unable to load SEO settings."));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  function setField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError(null);
    setSuccess(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingRef.current) return;
    const payload = {
      siteName: form.siteName.trim(),
      defaultTitle: form.defaultTitle.trim(),
      defaultDescription: form.defaultDescription.trim(),
      ...(form.defaultSocialImage.trim() ? { defaultSocialImage: form.defaultSocialImage.trim() } : {}),
    };
    if (!payload.siteName || !payload.defaultTitle || !payload.defaultDescription) {
      setError("Site name, default title, and default description are required.");
      return;
    }
    savingRef.current = true;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const saved = await updateSeoSettings(payload);
      setForm({ ...saved, defaultSocialImage: saved.defaultSocialImage ?? "" });
      setSuccess("SEO settings saved successfully.");
    } catch (err: unknown) {
      setError(errorMessage(err, "Unable to save SEO settings."));
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  const previewTitle = form.defaultTitle || "Your default SEO title";
  const previewDescription = form.defaultDescription || "Your default meta description will appear here.";

  if (loading) return <div className="border p-6 text-sm" role="status" style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)", color: "var(--color-muted)" }}>Loading SEO settings...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
      <form onSubmit={handleSubmit} className="border p-5 sm:p-6 space-y-5" aria-labelledby="seo-form-heading" style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}>
        <div className="border-b pb-5" style={{ borderColor: "var(--color-rule)" }}><h2 id="seo-form-heading" className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Global defaults</h2><p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>These values apply when a page does not provide custom SEO metadata.</p></div>
        <div className="space-y-2"><label htmlFor="siteName" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>Site Name</label><input id="siteName" value={form.siteName} onChange={(event) => setField("siteName", event.target.value)} maxLength={120} className={inputClass} style={inputStyle} /></div>
        <div className="space-y-2"><label htmlFor="defaultTitle" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>Default SEO Title</label><input id="defaultTitle" value={form.defaultTitle} onChange={(event) => setField("defaultTitle", event.target.value)} maxLength={255} className={inputClass} style={inputStyle} /></div>
        <div className="space-y-2"><label htmlFor="defaultDescription" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>Default Meta Description</label><textarea id="defaultDescription" value={form.defaultDescription} onChange={(event) => setField("defaultDescription", event.target.value)} maxLength={2000} rows={5} className={`${inputClass} resize-y`} style={inputStyle} /></div>
        <div className="space-y-2"><label htmlFor="defaultSocialImage" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>Default Social Image URL</label><input id="defaultSocialImage" type="url" value={form.defaultSocialImage} onChange={(event) => setField("defaultSocialImage", event.target.value)} placeholder="https://example.com/social-image.png" className={inputClass} style={inputStyle} /></div>
        <div className="space-y-2"><label htmlFor="siteUrl" className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>Site URL</label><input id="siteUrl" value={siteUrl} readOnly className={`${inputClass} opacity-70`} style={inputStyle} /></div>
        {(error || success) && <p className="text-sm" role={error ? "alert" : "status"} style={{ color: error ? "var(--color-accent-2)" : "var(--color-accent)" }}>{error ?? success}</p>}
        <button type="submit" disabled={saving} className="inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-medium rounded-full transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50" style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}>{saving ? "Saving..." : "Save SEO Settings"}</button>
      </form>

      <section className="border p-5 sm:p-6" style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}>
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-muted)" }}>Search Preview</p>
        <div className="mt-5 space-y-2"><p className="text-lg font-medium" style={{ color: "#1a0dab" }}>{previewTitle}</p><p className="text-xs" style={{ color: "var(--color-accent)" }}>{siteUrl}</p><p className="text-sm" style={{ color: "var(--color-muted)" }}>{previewDescription}</p></div>
      </section>
    </div>
  );
}