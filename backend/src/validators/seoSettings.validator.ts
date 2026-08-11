import { z } from "zod";

const optionalUrl = z
  .string()
  .url("Social image must be a valid URL")
  .max(2048, "Social image URL is too long")
  .optional()
  .or(z.literal("").transform(() => undefined));

export const updateSeoSettingsSchema = z.object({
  siteName: z.string().trim().min(1, "Site name is required").max(120, "Site name is too long"),
  defaultTitle: z.string().trim().min(1, "Default title is required").max(255, "Default title is too long"),
  defaultDescription: z.string().trim().min(1, "Default description is required").max(2000, "Default description is too long"),
  defaultSocialImage: optionalUrl,
});

export type UpdateSeoSettingsInput = z.infer<typeof updateSeoSettingsSchema>;