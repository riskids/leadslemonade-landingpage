import { Router } from "express";
import * as blogPostController from "../controllers/blogPost.controller";
import { validate } from "../middlewares/validate";
import { writeRateLimiter } from "../middlewares/rateLimiter";
import {
  createBlogPostSchema,
  updateBlogPostSchema,
  listBlogQuerySchema,
} from "../validators/blogPost.validator";

const router: Router = Router();

// GET /api/blog — list published posts (pagination, search, category filter)
router.get(
  "/",
  validate(listBlogQuerySchema, "query"),
  blogPostController.listPosts
);

// GET /api/blog/id/:id — single article for dashboard editing
router.get("/id/:id", blogPostController.getPostById);

// GET /api/blog/:slug — single article
router.get("/:slug", blogPostController.getPost);

// GET /api/blog/:slug/related — related articles (bonus)
router.get("/:slug/related", blogPostController.getRelated);

// POST /api/blog — create
router.post(
  "/",
  writeRateLimiter,
  validate(createBlogPostSchema, "body"),
  blogPostController.createPost
);

// PUT /api/blog/:id — update
router.put(
  "/:id",
  writeRateLimiter,
  validate(updateBlogPostSchema, "body"),
  blogPostController.updatePost
);

// DELETE /api/blog/:id — delete
router.delete("/:id", writeRateLimiter, blogPostController.deletePost);

export default router;
