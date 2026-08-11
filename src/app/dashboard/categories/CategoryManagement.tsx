"use client";

import { useEffect, useRef, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getCategoryOptions,
  updateCategory,
} from "@/lib/api/blog";
import type { Category, CategoryRequest } from "@/types/blog";

type FormState = { name: string; slug: string; description: string };
type LoadState = "loading" | "ready" | "error";

const emptyForm: FormState = { name: "", slug: "", description: "" };
const inputClass = "w-full min-h-11 border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60";
const inputStyle = {
  borderColor: "var(--color-rule)",
  borderRadius: "var(--radius-card)",
  background: "var(--color-paper)",
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(() => new Set());
  const deletingIdsRef = useRef(new Set<number>());

  async function loadCategories() {
    try {
      setState("loading");
      setError(null);
      setCategories(await getCategoryOptions());
      setState("ready");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load categories."));
      setState("error");
    }
  }

  useEffect(() => {
    void loadCategories();
  }, []);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setFeedback(null);
    setError(null);
  }

  function startEditing(category: Category) {
    setEditingId(category.id);
    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description ?? "",
    });
    setFeedback(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const name = form.name.trim();
    const slug = form.slug.trim();
    if (!name || !slug) {
      setError("Name and slug are required.");
      return;
    }

    const payload: CategoryRequest = {
      name,
      slug,
      ...(form.description.trim() ? { description: form.description.trim() } : {}),
    };
    setSubmitting(true);
    setError(null);
    setFeedback(null);
    try {
      if (editingId === null) {
        await createCategory(payload);
        setFeedback("Category created successfully.");
      } else {
        await updateCategory(editingId, payload);
        setFeedback("Category updated successfully.");
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadCategories();
    } catch (err) {
      setError(getErrorMessage(err, `Unable to ${editingId === null ? "create" : "update"} category.`));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(category: Category) {
    if (deletingIdsRef.current.has(category.id)) return;
    if (!window.confirm(`Delete “${category.name}”? This action cannot be undone.`)) return;

    deletingIdsRef.current.add(category.id);
    setDeletingIds(new Set(deletingIdsRef.current));
    setError(null);
    setFeedback(null);
    try {
      await deleteCategory(category.id);
      setCategories((current) => current.filter(({ id }) => id !== category.id));
      setFeedback("Category deleted successfully.");
      if (editingId === category.id) resetForm();
    } catch (err) {
      setError(getErrorMessage(err, "Unable to delete category."));
    } finally {
      deletingIdsRef.current.delete(category.id);
      setDeletingIds(new Set(deletingIdsRef.current));
    }
  }

  return (
    <div className="space-y-6">
      <section className="border p-5 sm:p-6" aria-labelledby="category-form-heading" style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}>
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h2 id="category-form-heading" className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              {editingId === null ? "Add Category" : "Edit Category"}
            </h2>
            <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
              Use a clear name and URL-friendly slug.
            </p>
          </div>
          {editingId !== null && <button type="button" onClick={resetForm} className="min-h-10 rounded-md px-3 text-sm hover:bg-paper-3" style={{ color: "var(--color-accent)" }}>Cancel</button>}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
              Name
              <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className={inputClass} style={inputStyle} maxLength={120} />
            </label>
            <label className="space-y-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
              Slug
              <input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} className={inputClass} style={inputStyle} />
            </label>
          </div>
          <label className="block space-y-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-ink-2)" }}>
            Description
            <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={3} maxLength={2000} className={`${inputClass} resize-none`} style={inputStyle} />
          </label>
          {(error || feedback) && <p className="text-sm" role={error ? "alert" : "status"} style={{ color: error ? "var(--color-accent-2)" : "var(--color-accent)" }}>{error ?? feedback}</p>}
          <button type="submit" disabled={submitting} className="inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-medium rounded-full transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50" style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}>
            {submitting ? "Saving..." : editingId === null ? "Add Category" : "Save Changes"}
          </button>
        </form>
      </section>

      <section className="border overflow-hidden" style={{ borderColor: "var(--color-rule)", borderRadius: "var(--radius-card)" }}>
        <div className="p-5 border-b" style={{ borderColor: "var(--color-rule)" }}>
          <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>All Categories</h2>
        </div>
        {state === "loading" && <p className="p-6 text-sm" style={{ color: "var(--color-muted)" }}>Loading categories...</p>}
        {state === "error" && <p className="p-6 text-sm" style={{ color: "var(--color-accent-2)" }}>{error}</p>}
        {state === "ready" && categories.length === 0 && <p className="p-6 text-sm" style={{ color: "var(--color-muted)" }}>No categories found.</p>}
        {state === "ready" && categories.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead style={{ background: "var(--color-paper-3)", color: "var(--color-muted)" }}>
                <tr><th className="px-5 py-3 font-medium">Name</th><th className="px-5 py-3 font-medium">Slug</th><th className="px-5 py-3 font-medium">Posts</th><th className="px-5 py-3 font-medium text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--color-rule)" }}>
                {categories.map((category) => (
                    <tr key={category.id} className="transition-colors hover:bg-paper-3">
                    <td className="px-5 py-4 align-top"><p className="font-medium">{category.name}</p>{category.description && <p className="text-xs mt-1 max-w-sm break-words" style={{ color: "var(--color-muted)" }}>{category.description}</p>}</td>
                    <td className="px-5 py-4" style={{ color: "var(--color-muted)" }}>{category.slug}</td>
                    <td className="px-5 py-4">{category.postCount}</td>
                    <td className="px-5 py-4 align-top"><div className="flex justify-end gap-1"><button type="button" onClick={() => startEditing(category)} className="min-h-10 rounded-md px-3 text-sm font-medium hover:bg-paper-3" style={{ color: "var(--color-accent)" }}>Edit</button><button type="button" onClick={() => void handleDelete(category)} disabled={deletingIds.has(category.id)} className="min-h-10 rounded-md px-3 text-sm font-medium hover:bg-paper-3 disabled:cursor-not-allowed disabled:opacity-50" style={{ color: "var(--color-accent-2)" }}>{deletingIds.has(category.id) ? "Deleting..." : "Delete"}</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}