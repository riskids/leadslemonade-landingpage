import { z } from "zod";
import { slugSchema } from "./blogPost.validator";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(120, "Name is too long"),
  slug: slugSchema,
  description: z.string().max(2000, "Description is too long").optional().or(z.literal("").transform(() => undefined)),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

