import { prisma } from "../config/prisma";
import { ApiError } from "../utils/ApiError";
import { slugify } from "../utils/slugify";
import type { CreateCategoryInput, UpdateCategoryInput } from "../validators/category.validator";

export async function listCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { blogPosts: true } },
    },
  });
}

export async function getCategoryById(id: number) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    throw ApiError.notFound("Category not found");
  }
  return category;
}

export async function createCategory(input: CreateCategoryInput) {
  const normalizedSlug = slugify(input.slug) || input.slug;
  const existing = await prisma.category.findUnique({ where: { slug: normalizedSlug } });
  if (existing) {
    throw ApiError.conflict("Slug already in use", [`Slug "${normalizedSlug}" is already taken`]);
  }
  return prisma.category.create({
    data: {
      name: input.name,
      slug: normalizedSlug,
      description: input.description ?? null,
    },
  });
}

export async function updateCategory(id: number, input: UpdateCategoryInput) {
  const existing = await getCategoryById(id);

  if (input.slug !== undefined && input.slug !== existing.slug) {
    const normalizedSlug = slugify(input.slug) || input.slug;
    const slugTaken = await prisma.category.findUnique({ where: { slug: normalizedSlug } });
    if (slugTaken && slugTaken.id !== id) {
      throw ApiError.conflict("Slug already in use", [`Slug "${normalizedSlug}" is already taken`]);
    }
    input.slug = normalizedSlug;
  }

  return prisma.category.update({
    where: { id },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.slug !== undefined && { slug: input.slug }),
      ...(input.description !== undefined && { description: input.description }),
    },
  });
}

export async function deleteCategory(id: number) {
  const category = await getCategoryById(id);

  // Prevent deleting a category still referenced by posts
  const postCount = await prisma.blogPost.count({ where: { categoryId: category.id } });
  if (postCount > 0) {
    throw ApiError.badRequest("Cannot delete category in use", [
      `Category "${category.name}" is referenced by ${postCount} blog post(s)`,
    ]);
  }

  await prisma.category.delete({ where: { id } });
  return { id };
}
