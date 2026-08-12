import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { requireAuth, requireTrustedOrigin } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { writeRateLimiter } from "../middlewares/rateLimiter";
import { createCategorySchema, updateCategorySchema } from "../validators/category.validator";

const router: Router = Router();

router.get("/", categoryController.listCategories);
router.post("/", requireAuth, requireTrustedOrigin, writeRateLimiter, validate(createCategorySchema, "body"), categoryController.createCategory);
router.put("/:id", requireAuth, requireTrustedOrigin, writeRateLimiter, validate(updateCategorySchema, "body"), categoryController.updateCategory);
router.delete("/:id", requireAuth, requireTrustedOrigin, writeRateLimiter, categoryController.deleteCategory);

export default router;
