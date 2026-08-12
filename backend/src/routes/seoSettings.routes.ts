import { Router } from "express";
import * as seoSettingsController from "../controllers/seoSettings.controller";
import { requireAuth, requireTrustedOrigin } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { writeRateLimiter } from "../middlewares/rateLimiter";
import { updateSeoSettingsSchema } from "../validators/seoSettings.validator";

const router: Router = Router();

router.get("/", seoSettingsController.getSeoSettings);
router.put("/", requireAuth, requireTrustedOrigin, writeRateLimiter, validate(updateSeoSettingsSchema, "body"), seoSettingsController.updateSeoSettings);

export default router;