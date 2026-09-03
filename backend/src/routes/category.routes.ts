import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { validate } from "../middlewares/validate";
import { writeRateLimiter } from "../middlewares/rateLimiter";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator";

const router: Router = Router();

// GET /api/categories
router.get("/", categoryController.listCategories);

// POST /api/categories
router.post(
  "/",
  writeRateLimiter,
  validate(createCategorySchema, "body"),
  categoryController.createCategory
);

// PUT /api/categories/:id
router.put(
  "/:id",
  writeRateLimiter,
  validate(updateCategorySchema, "body"),
  categoryController.updateCategory
);

// DELETE /api/categories/:id
router.delete("/:id", writeRateLimiter, categoryController.deleteCategory);

export default router;
