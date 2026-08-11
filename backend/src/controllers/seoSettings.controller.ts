import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import * as seoSettingsService from "../services/seoSettings.service";
import type { UpdateSeoSettingsInput } from "../validators/seoSettings.validator";

export const getSeoSettings = asyncHandler(async (_req: Request, res: Response) => {
  res.json(ok(await seoSettingsService.getSeoSettings()));
});

export const updateSeoSettings = asyncHandler(async (req: Request, res: Response) => {
  const input = req.body as UpdateSeoSettingsInput;
  res.json(ok(await seoSettingsService.updateSeoSettings(input)));
});