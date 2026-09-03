import { Request, Response } from "express";
import { ok } from "../utils/response";
import { asyncHandler } from "../utils/asyncHandler";
import * as categoryService from "../services/category.service";
import { toCategoryDTO, toCategoryDTOSimple } from "../utils/dto";
import type { CreateCategoryInput, UpdateCategoryInput } from "../validators/category.validator";

/**
 * GET /api/categories
 */
export const listCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await categoryService.listCategories();
  res.json(ok(categories.map(toCategoryDTO)));
});

/**
 * POST /api/categories
 */
export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const input = req.body as CreateCategoryInput;
  const category = await categoryService.createCategory(input);
  res.status(201).json(ok(toCategoryDTOSimple(category)));
});

/**
 * PUT /api/categories/:id
 */
export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
  const input = req.body as UpdateCategoryInput;
  const category = await categoryService.updateCategory(id, input);
  res.json(ok(toCategoryDTOSimple(category)));
});

/**
 * DELETE /api/categories/:id
 */
export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
  await categoryService.deleteCategory(id);
  res.json(ok({ id }));
});
