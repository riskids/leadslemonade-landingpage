import { z } from "zod";

/**
 * Slug must be lowercase, URL-friendly (a-z, 0-9, single hyphens),
 * not start/end with a hyphen.
 */
export const slugSchema = z
  .string()
  .min(1, "Slug is required")
  .max(200, "Slug is too long")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, URL-friendly (letters, numbers, hyphens)");

export const blogStatusSchema = z.enum(["DRAFT", "PUBLISHED"]);

export const createBlogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  slug: slugSchema,
  excerpt: z.string().min(1, "Excerpt is required").max(1000, "Excerpt is too long"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url("Cover image must be a valid URL").optional().or(z.literal("").transform(() => undefined)),
  categoryId: z.coerce.number().int("categoryId must be an integer").positive("categoryId must be positive"),
  author: z.string().min(1, "Author is required").max(120, "Author is too long"),
  status: blogStatusSchema.default("DRAFT"),
  metaTitle: z.string().max(60, "metaTitle must be at most 60 characters").default(""),
  metaDescription: z.string().max(160, "metaDescription must be at most 160 characters").default(""),
  keywords: z.array(z.string()).default([]),
});

export const updateBlogPostSchema = createBlogPostSchema.partial().extend({
  // Allow clearing the publishedAt when unpublishing
  status: blogStatusSchema.optional(),
});

export const listBlogQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  status: blogStatusSchema.optional(),
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
export type ListBlogQuery = z.infer<typeof listBlogQuerySchema>;

