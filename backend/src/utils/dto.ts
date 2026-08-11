import { Prisma } from "@prisma/client";

/**
 * Shape a single BlogPost (with its category) into the SEO response
 * envelope required by the spec.
 *
 * {
 *   title, slug, excerpt, content,
 *   metaTitle, metaDescription, keywords,
 *   coverImage, publishedAt,
 *   ... + useful extra fields for the dashboard
 * }
 */
export type BlogPostDTO = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  categoryId: number;
  category: { id: number; name: string; slug: string } | null;
  author: string;
  status: "DRAFT" | "PUBLISHED";
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  readingTime: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type PostWithCategory = Prisma.BlogPostGetPayload<{ include: { category: true } }>;

export function toBlogPostDTO(post: PostWithCategory): BlogPostDTO {
  const keywordsRaw = post.keywords as unknown;
  const keywords = Array.isArray(keywordsRaw)
    ? keywordsRaw.filter((k): k is string => typeof k === "string")
    : [];

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    categoryId: post.categoryId,
    category: post.category
      ? { id: post.category.id, name: post.category.name, slug: post.category.slug }
      : null,
    author: post.author,
    status: post.status,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    keywords,
    readingTime: post.readingTime,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

export type CategoryDTO = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  postCount: number;
  createdAt: string;
  updatedAt: string;
};

type CategoryWithCount = Prisma.CategoryGetPayload<{
  include: { _count: { select: { blogPosts: true } } };
}>;

export function toCategoryDTO(category: CategoryWithCount): CategoryDTO {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    postCount: category._count.blogPosts,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
  };
}

type CategoryPlain = Prisma.CategoryGetPayload<{}>;

export function toCategoryDTOSimple(category: CategoryPlain): CategoryDTO {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    postCount: 0,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
  };
}
