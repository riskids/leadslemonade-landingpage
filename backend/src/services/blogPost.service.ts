import { Prisma, PostStatus } from "@prisma/client";
import { prisma } from "../config/prisma";
import { ApiError } from "../utils/ApiError";
import { slugify, estimateReadingTime } from "../utils/slugify";
import type { CreateBlogPostInput, UpdateBlogPostInput, ListBlogQuery } from "../validators/blogPost.validator";

function buildWhere(query: ListBlogQuery): Prisma.BlogPostWhereInput {
  const where: Prisma.BlogPostWhereInput = {};

  // Public listing only returns PUBLISHED unless status explicitly requested
  if (query.status) {
    where.status = query.status;
  } else {
    where.status = PostStatus.PUBLISHED;
  }

  if (query.search && query.search.trim() !== "") {
    const term = query.search.trim();
    where.OR = [
      { title: { contains: term } },
      { excerpt: { contains: term } },
      { content: { contains: term } },
    ];
  }

  if (query.category && query.category.trim() !== "") {
    where.category = { slug: query.category.trim() };
  }

  return where;
}

export async function listPublishedPosts(query: ListBlogQuery) {
  const where = buildWhere(query);
  const page = query.page;
  const pageSize = query.pageSize;

  const [items, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return { items, total, page, pageSize };
}

export async function getPublishedPostBySlug(slug: string) {
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: PostStatus.PUBLISHED },
    include: { category: true },
  });
  if (!post) {
    throw ApiError.notFound("Blog post not found");
  }
  return post;
}

export async function getPostById(id: number) {
  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!post) {
    throw ApiError.notFound("Blog post not found");
  }
  return post;
}

export async function getRelatedPosts(id: number, categoryId: number, limit = 3) {
  return prisma.blogPost.findMany({
    where: {
      id: { not: id },
      categoryId,
      status: PostStatus.PUBLISHED,
    },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function createPost(input: CreateBlogPostInput) {
  // Verify category exists
  const category = await prisma.category.findUnique({
    where: { id: input.categoryId },
  });
  if (!category) {
    throw ApiError.badRequest("Invalid categoryId", [`Category with id ${input.categoryId} does not exist`]);
  }

  // Slug uniqueness check (explicit, clearer than relying on P2002)
  const existing = await prisma.blogPost.findUnique({ where: { slug: input.slug } });
  if (existing) {
    throw ApiError.conflict("Slug already in use", [`Slug "${input.slug}" is already taken`]);
  }

  const readingTime = estimateReadingTime(input.content);
  const publishedAt = input.status === PostStatus.PUBLISHED ? new Date() : null;
  const normalizedSlug = slugify(input.slug) || input.slug;

  return prisma.blogPost.create({
    data: {
      title: input.title,
      slug: normalizedSlug,
      excerpt: input.excerpt,
      content: input.content,
      coverImage: input.coverImage ?? null,
      categoryId: input.categoryId,
      author: input.author,
      status: input.status,
      metaTitle: input.metaTitle,
      metaDescription: input.metaDescription,
      keywords: input.keywords,
      readingTime,
      publishedAt,
    },
    include: { category: true },
  });
}

export async function updatePost(id: number, input: UpdateBlogPostInput) {
  const existing = await getPostById(id);

  // If categoryId is changing, verify the new category exists
  if (input.categoryId !== undefined && input.categoryId !== existing.categoryId) {
    const category = await prisma.category.findUnique({ where: { id: input.categoryId } });
    if (!category) {
      throw ApiError.badRequest("Invalid categoryId", [`Category with id ${input.categoryId} does not exist`]);
    }
  }

  // If slug is changing, ensure it is unique
  if (input.slug !== undefined && input.slug !== existing.slug) {
    const slugTaken = await prisma.blogPost.findUnique({ where: { slug: input.slug } });
    if (slugTaken && slugTaken.id !== id) {
      throw ApiError.conflict("Slug already in use", [`Slug "${input.slug}" is already taken`]);
    }
  }

  // Recompute reading time when content changes
  let readingTime: number | undefined;
  if (input.content !== undefined) {
    readingTime = estimateReadingTime(input.content);
  }

  // Handle publishedAt transitions
  let publishedAt = existing.publishedAt;
  if (input.status === PostStatus.PUBLISHED && existing.status !== PostStatus.PUBLISHED) {
    publishedAt = new Date();
  } else if (input.status === PostStatus.DRAFT) {
    publishedAt = null;
  }

  const normalizedSlug =
    input.slug !== undefined ? slugify(input.slug) || input.slug : undefined;

  return prisma.blogPost.update({
    where: { id },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(normalizedSlug !== undefined && { slug: normalizedSlug }),
      ...(input.excerpt !== undefined && { excerpt: input.excerpt }),
      ...(input.content !== undefined && { content: input.content }),
      ...(input.coverImage !== undefined && { coverImage: input.coverImage }),
      ...(input.categoryId !== undefined && { categoryId: input.categoryId }),
      ...(input.author !== undefined && { author: input.author }),
      ...(input.status !== undefined && { status: input.status }),
      ...(input.metaTitle !== undefined && { metaTitle: input.metaTitle }),
      ...(input.metaDescription !== undefined && { metaDescription: input.metaDescription }),
      ...(input.keywords !== undefined && { keywords: input.keywords }),
      ...(readingTime !== undefined && { readingTime }),
      publishedAt,
    },
    include: { category: true },
  });
}

export async function deletePost(id: number) {
  // Will throw 404 via getPostById if not found
  await getPostById(id);
  await prisma.blogPost.delete({ where: { id } });
  return { id };
}

