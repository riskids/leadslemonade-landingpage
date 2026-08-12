import { Router } from "express";
import * as blogPostController from "../controllers/blogPost.controller";
import { requireAuth, requireTrustedOrigin } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { writeRateLimiter } from "../middlewares/rateLimiter";
import { createBlogPostSchema, updateBlogPostSchema, listBlogQuerySchema } from "../validators/blogPost.validator";

const router: Router = Router();

router.get("/", validate(listBlogQuerySchema, "query"), blogPostController.listPosts);
router.get("/id/:id", requireAuth, blogPostController.getPostById);
router.get("/:slug", blogPostController.getPost);
router.get("/:slug/related", blogPostController.getRelated);
router.post("/", requireAuth, requireTrustedOrigin, writeRateLimiter, validate(createBlogPostSchema, "body"), blogPostController.createPost);
router.put("/:id", requireAuth, requireTrustedOrigin, writeRateLimiter, validate(updateBlogPostSchema, "body"), blogPostController.updatePost);
router.delete("/:id", requireAuth, requireTrustedOrigin, writeRateLimiter, blogPostController.deletePost);

export default router;
