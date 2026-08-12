/**
 * Blog API service layer.
 *
 * Thin wrapper around the Node.js backend that returns data already shaped
 * to match the existing UI types (`BlogPost`, `Category`, `ContentBlock`)
 * exported from `@/lib/blog-data`. This keeps every blog component working
 * unchanged: no component, style, or layout edits are required.
 *
 * Base URL is read from `NEXT_PUBLIC_API_URL` (see `.env.local`). It is
 * never hardcoded.
 */

import type {
  ApiResponse,
  BlogResponse,
  Category as CategoryDTO,
  BlogPost as BlogPostDTO,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
  PublicCategoryOption,
  CategoryRequest,
  SeoSettings,
  UpdateSeoSettingsRequest,
} from "@/types/blog";
import type {
  BlogPost,
  Category,
  ContentBlock,
} from "@/lib/blog-data";

export type DashboardBlogPost = BlogPost & { id: number };

export interface PublicBlogListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
}

export interface PublicBlogListResult {
  posts: BlogPost[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined. Add it to .env.local (e.g. NEXT_PUBLIC_API_URL=http://localhost:5001/api).",
  );
}

/** Build an absolute URL from a backend path, ensuring exactly one slash. */
function apiUrl(path: string): string {
  const base = API_URL!.replace(/\/+$/, "");
  const tail = path.replace(/^\/+/, "");
  return `${base}/${tail}`;
}

/**
 * Fetch JSON from the backend and unwrap the standard
 * `{ success, data }` envelope. Throws an `Error` for non-OK responses or
 * for envelopes where `success === false`, so callers can use try/catch to
 * render an error state.
 */
async function fetchJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  const signal = init.signal
    ? AbortSignal.any([init.signal, controller.signal])
    : controller.signal;

  try {
    const res = await fetch(apiUrl(path), {
      // Revalidate at most once per minute on the server, and never cache
      // stale data on the client. Mutations opt out of this cache policy below.
      ...(init.method ? {} : { next: { revalidate: 60 } }),
      ...init,
      credentials: "include",
      headers,
      signal,
    });

    if (!res.ok) {
      let message = `Request failed with status ${res.status}`;
      try {
        const body = (await res.json()) as ApiResponse<unknown>;
        if (body && body.message) message = body.message;
      } catch {
        /* response was not JSON; keep the default message */
      }
      throw new Error(message);
    }

    const body = (await res.json()) as ApiResponse<T>;

    if (!body || body.success !== true) {
      const message =
        body && body.message ? body.message : "Unexpected API response";
      throw new Error(message);
    }

    return body.data;
  } finally {
    clearTimeout(timeout);
  }
}


/* -------------------------------------------------------------------------- */
/*                                Mapping helpers                             */
/* -------------------------------------------------------------------------- */

/**
 * Convert an ISO date string into a human-friendly format that matches the
 * existing mock data style, e.g. "Aug 5, 2026". Falls back to the raw
 * string when the date cannot be parsed.
 */
function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Strip basic inline markdown (bold, italic, code, links) to plain text. */
function stripInline(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) -> text
    .replace(/`([^`]+)`/g, "$1") // `code` -> code
    .replace(/\*\*([^*]+)\*\*/g, "$1") // **bold** -> bold
    .replace(/\*([^*]+)\*/g, "$1") // *italic* -> italic
    .replace(/__([^_]+)__/g, "$1") // __bold__ -> bold
    .replace(/_([^_]+)_/g, "$1") // _italic_ -> italic
    .trim();
}

/**
 * Parse the markdown string returned by the backend into the
 * `ContentBlock[]` shape (`{ type: "h2" | "h3" | "p", text }`) consumed by
 * `<BlogArticle />`.
 *
 * Recognised markdown constructs:
 *  - `# heading`      -> dropped (the <BlogArticle> renders post.title)
 *  - `## heading`     -> h2
 *  - `### heading`    -> h3
 *  - `- item` / `* item` -> joined into a single paragraph per run
 *  - blank line        -> paragraph break
 *  - everything else   -> paragraph
 *
 * Inline markdown (bold/italic/links) is stripped to plain text because the
 * current UI only renders plain text blocks.
 */
function parseContent(markdown: string | null | undefined): ContentBlock[] {
  if (!markdown) return [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");

  const blocks: ContentBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "p", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "p", text: list.join(". ").trim() + "." });
      list = [];
    }
  };
  const flushAll = () => {
    flushList();
    flushParagraph();
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      flushAll();
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      flushAll();
      blocks.push({ type: "h3", text: stripInline(line.slice(4)) });
      continue;
    }
    if (line.startsWith("## ")) {
      flushAll();
      blocks.push({ type: "h2", text: stripInline(line.slice(3)) });
      continue;
    }
    // Top-level "# Title" — the <BlogArticle> already renders the title via
    // post.title, so drop it to avoid duplication.
    if (line.startsWith("# ")) {
      flushAll();
      continue;
    }

    // List items
    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph();
      list.push(stripInline(line.slice(2)));
      continue;
    }

    // Regular paragraph text
    flushList();
    paragraph.push(stripInline(line));
  }

  flushAll();

  return blocks.filter((b) => b.text.length > 0);
}

/** Map a backend `BlogPost` DTO to the UI `BlogPost` type. */
function toBlogPost(dto: BlogPostDTO): DashboardBlogPost {
  return {
    id: dto.id,
    title: dto.title,
    slug: dto.slug,
    category: (dto.category?.name ?? "Uncategorised") as Category,
    excerpt: dto.excerpt ?? "",
    image: dto.coverImage ?? "",
    author: dto.author ?? "Lead Lemonade",
    date: formatDate(dto.publishedAt ?? dto.createdAt),
    readingTime:
      dto.readingTime != null ? `${dto.readingTime} min read` : "",
    status:
      dto.status === "PUBLISHED"
        ? ("Published" as const)
        : ("Draft" as const),
    // The public blog UI does not display an SEO score; default to 0 to
    // satisfy the type contract used by the admin BlogTable.
    seoScore: 0,
    updatedAt: formatDate(dto.updatedAt),
    content: parseContent(dto.content),
  };
}

/** Map a backend `Category` DTO to the UI `Category` type (a name string). */
function toCategoryName(dto: CategoryDTO): Category {
  return dto.name as Category;
}

/* -------------------------------------------------------------------------- */
/*                                Public API                                  */
/* -------------------------------------------------------------------------- */

/**
 * Fetch the list of published blog posts.
 *
 * GET /blog -> `{ items, page, pageSize, total, totalPages }`
 * Returns the mapped UI `BlogPost[]`.
 */
export async function getBlogs(): Promise<DashboardBlogPost[]> {
  const data = await fetchJson<BlogResponse>("blog");
  return (data.items ?? []).map(toBlogPost);
}

/** Fetch one published public listing page with backend filtering applied. */
export async function getPublicBlogPage(
  params: PublicBlogListParams = {},
  signal?: AbortSignal,
): Promise<PublicBlogListResult> {
  const query = new URLSearchParams();
  query.set("page", String(params.page ?? 1));
  query.set("pageSize", String(params.pageSize ?? 10));
  if (params.search?.trim()) query.set("search", params.search.trim());
  if (params.category?.trim()) query.set("category", params.category.trim());

  const data = await fetchJson<BlogResponse>(`blog?${query.toString()}`, {
    cache: "no-store",
    signal,
  });

  return {
    posts: (data.items ?? []).map(toBlogPost),
    page: data.page,
    pageSize: data.pageSize,
    total: data.total,
    totalPages: data.totalPages,
  };
}

/** Fetch all published DTOs needed by the public sitemap. */
export async function getPublishedBlogsForSitemap(): Promise<BlogPostDTO[]> {
  const firstPage = await fetchJson<BlogResponse>("blog?page=1&pageSize=100");
  const items = [...(firstPage.items ?? [])];

  for (let page = 2; page <= firstPage.totalPages; page += 1) {
    const nextPage = await fetchJson<BlogResponse>(`blog?page=${page}&pageSize=100`);
    items.push(...(nextPage.items ?? []));
  }

  return items.filter((post) => post.status === "PUBLISHED");
}

/**
 * Fetch draft and published posts for the dashboard without changing the
 * public listing's published-only default.
 */
export async function getDashboardBlogs(): Promise<DashboardBlogPost[]> {
  const [drafts, published] = await Promise.all([
    fetchJson<BlogResponse>("blog?status=DRAFT&pageSize=100", { cache: "no-store" }),
    fetchJson<BlogResponse>("blog?status=PUBLISHED&pageSize=100", { cache: "no-store" }),
  ]);

  return [...(drafts.items ?? []), ...(published.items ?? [])].map(toBlogPost);
}

/**
 * Fetch a single blog post by slug.
 *
 * GET /blog/:slug -> `BlogPost`
 * Returns the mapped UI `BlogPost`, or `null` when the post does not exist.
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const data = await fetchJson<BlogPostDTO>(
      `blog/${encodeURIComponent(slug)}`,
    );
    return toBlogPost(data);
  } catch (err) {
    // A 404 means "not found"; surface that as null so the page can call
    // notFound(). Any other error is re-thrown.
    if (err instanceof Error && /404|not found/i.test(err.message)) {
      return null;
    }
    throw err;
  }
}

/**
 * Fetch the list of categories (as UI category-name strings, since
 * `<CategoryFilter>` expects `readonly string[]`).
 *
 * GET /categories -> `Category[]`
 */
export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson<CategoryDTO[]>("categories");
  return (data ?? []).map(toCategoryName);
}

/** Fetch category DTOs for dashboard forms that need category IDs. */
export async function getCategoryOptions(): Promise<CategoryDTO[]> {
  return fetchJson<CategoryDTO[]>("categories");
}

/** Create a category through POST /categories. */
export async function createCategory(
  payload: CategoryRequest,
): Promise<CategoryDTO> {
  return fetchJson<CategoryDTO>("categories", {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

/** Update a category through PUT /categories/:id. */
export async function updateCategory(
  id: number,
  payload: Partial<CategoryRequest>,
): Promise<CategoryDTO> {
  return fetchJson<CategoryDTO>(`categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

/** Delete a category through DELETE /categories/:id. */
export async function deleteCategory(id: number): Promise<{ id: number }> {
  return fetchJson<{ id: number }>(`categories/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
}

/** Fetch global SEO settings through GET /seo-settings. */
export async function getSeoSettings(): Promise<SeoSettings> {
  return fetchJson<SeoSettings>("seo-settings", { cache: "no-store" });
}

/** Read global SEO settings without making public rendering depend on the API. */
export async function getSeoSettingsSafe(): Promise<SeoSettings | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);
  try {
    return await fetchJson<SeoSettings>("seo-settings", {
      next: { revalidate: 60 },
      signal: controller.signal,
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/** Update global SEO settings through PUT /seo-settings. */
export async function updateSeoSettings(
  payload: UpdateSeoSettingsRequest,
): Promise<SeoSettings> {
  return fetchJson<SeoSettings>("seo-settings", {
    method: "PUT",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

/** Fetch public category labels and slugs for the listing filter. */
export async function getPublicCategoryOptions(): Promise<PublicCategoryOption[]> {
  const data = await fetchJson<CategoryDTO[]>("categories");
  return (data ?? []).map(({ name, slug }) => ({ name, slug }));
}

/**
 * Fetch related blog posts for a given slug.
 *
 * GET /blog/:slug/related -> `BlogPost[]`
 */
export async function getRelatedBlogs(slug: string): Promise<BlogPost[]> {
  try {
    const data = await fetchJson<BlogPostDTO[]>(
      `blog/${encodeURIComponent(slug)}/related`,
    );
    return (data ?? []).map(toBlogPost);
  } catch (err) {
    // Related articles are non-critical; degrade gracefully to an empty list.
    if (err instanceof Error && /404|not found/i.test(err.message)) {
      return [];
    }
    throw err;
  }
}

export type { BlogPost, Category, ContentBlock };

/** Create a blog post through POST /blog. */
export async function createBlogPost(
  payload: CreateBlogPostRequest,
): Promise<BlogPostDTO> {
  return fetchJson<BlogPostDTO>("blog", {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

/** Update a blog post through PUT /blog/:id. */
export async function updateBlogPost(
  id: number,
  payload: UpdateBlogPostRequest,
): Promise<BlogPostDTO> {
  return fetchJson<BlogPostDTO>(`blog/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}

/** Delete a blog post through DELETE /blog/:id. */
export async function deleteBlogPost(id: number): Promise<{ id: number }> {
  return fetchJson<{ id: number }>(`blog/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
}

/**
 * Fetch the raw backend `BlogPost` DTO (un-mapped) for a given slug.
 *
 * GET /blog/:slug -> `BlogPostDTO`
 *
 * Used by `generateMetadata()` to access backend SEO fields
 * (`metaTitle`, `metaDescription`, `keywords`) that are not part of the
 * UI-mapped `BlogPost` type. Returns `null` when the post does not exist.
 */
export async function getBlogBySlugRaw(
  slug: string,
): Promise<BlogPostDTO | null> {
  try {
    return await fetchJson<BlogPostDTO>(`blog/${encodeURIComponent(slug)}`);
  } catch (err) {
    if (err instanceof Error && /404|not found/i.test(err.message)) {
      return null;
    }
    throw err;
  }
}

/** Fetch the raw dashboard-edit DTO through GET /blog/id/:id. */
export async function getBlogById(id: number): Promise<BlogPostDTO | null> {
  try {
    return await fetchJson<BlogPostDTO>(`blog/id/${id}`, { cache: "no-store" });
  } catch (err) {
    if (err instanceof Error && /404|not found/i.test(err.message)) {
      return null;
    }
    throw err;
  }
}

