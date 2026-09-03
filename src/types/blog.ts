/**
 * Types for the Lead Lemonade blog backend API.
 *
 * These mirror the response payload produced by the Express backend
 * (see backend/src/utils/dto.ts). The frontend consumes the mapped
 * `BlogPost` / `Category` shapes exported from `@/lib/blog-data` so the
 * existing UI components keep working unchanged; the service layer in
 * `lib/api/blog.ts` is responsible for converting these DTOs into those
 * UI-friendly types.
 */

/** Standard API envelope returned by every backend endpoint. */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

/** Category as returned by GET /categories and embedded in a blog post. */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  postCount: number;
  createdAt: string;
  updatedAt: string;
}

/** A single blog post as returned by GET /blog and GET /blog/:slug. */
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  /** Markdown content string from the backend. */
  content: string;
  coverImage: string | null;
  categoryId: number;
  category: { id: number; name: string; slug: string } | null;
  author: string;
  status: "PUBLISHED" | "DRAFT";
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Estimated reading time in minutes. */
  readingTime: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Paginated list payload returned by GET /blog. */
export interface BlogResponse {
  items: BlogPost[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PublicCategoryOption {
  name: string;
  slug: string;
}

/** Related-articles payload returned by GET /blog/:slug/related. */
export type RelatedBlogsResponse = BlogPost[];

/** Values accepted by the backend for a blog post status. */
export type BlogPostStatus = "DRAFT" | "PUBLISHED";

/** Payload accepted by POST /blog. */
export interface CreateBlogPostRequest {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  categoryId: number;
  author: string;
  status?: BlogPostStatus;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

/** Partial payload accepted by PUT /blog/:id. */
export type UpdateBlogPostRequest = Partial<CreateBlogPostRequest>;

/** Payload shared by category create/update operations. */
export interface CategoryRequest {
  name: string;
  slug: string;
  description?: string;
}

export interface SeoSettings {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultSocialImage: string | null;
}

export type UpdateSeoSettingsRequest = Omit<SeoSettings, "defaultSocialImage"> & {
  defaultSocialImage?: string;
};

/** Standard response returned by blog create/update mutations. */
export type BlogMutationResponse<T = BlogPost> = ApiResponse<T>;
