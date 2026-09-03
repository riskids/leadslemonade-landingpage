import { Request, Response } from "express";
import { ok, paginated } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";
import * as blogPostService from "../services/blogPost.service";
import { toBlogPostDTO } from "../utils/dto";
import type { ListBlogQuery } from "../validators/blogPost.validator";
import type { UpdateBlogPostInput } from "../validators/blogPost.validator";
import type { CreateBlogPostInput } from "../validators/blogPost.validator";

/**
 * GET /api/blog
 * Public listing of published posts with pagination, search, category filter.
 */
export const listPosts = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as ListBlogQuery;
  const { items, total, page, pageSize } = await blogPostService.listPublishedPosts(query);
  res.json(paginated(items.map(toBlogPostDTO), total, page, pageSize));
});

/**
 * GET /api/blog/:slug
 * Public single-article fetch by slug.
 */
export const getPost = asyncHandler(async (req: Request, res: Response) => {
  const post = await blogPostService.getPublishedPostBySlug(req.params.slug);
  res.json(ok(toBlogPostDTO(post)));
});

/** GET /api/blog/id/:id — dashboard single-article fetch by ID. */
export const getPostById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
  const post = await blogPostService.getPostById(id);
  res.json(ok(toBlogPostDTO(post)));
});

/**
 * GET /api/blog/:slug/related
 * Related published posts in the same category (bonus endpoint for the
 * frontend "Related Articles" section).
 */
export const getRelated = asyncHandler(async (req: Request, res: Response) => {
  const post = await blogPostService.getPublishedPostBySlug(req.params.slug);
  const related = await blogPostService.getRelatedPosts(post.id, post.categoryId, 3);
  res.json(ok(related.map(toBlogPostDTO)));
});

/**
 * POST /api/blog
 * Create a new blog post (draft or published).
 */
export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const input = req.body as CreateBlogPostInput;
  const post = await blogPostService.createPost(input);
  res.status(201).json(ok(toBlogPostDTO(post)));
});

/**
 * PUT /api/blog/:id
 * Update an existing blog post.
 */
export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
  const input = req.body as UpdateBlogPostInput;
  const post = await blogPostService.updatePost(id, input);
  res.json(ok(toBlogPostDTO(post)));
});

/**
 * DELETE /api/blog/:id
 * Delete a blog post.
 */
export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
  await blogPostService.deletePost(id);
  res.json(ok({ id }));
});
