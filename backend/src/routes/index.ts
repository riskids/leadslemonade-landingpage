import { Router } from "express";
import blogRoutes from "./blog.routes";
import categoryRoutes from "./category.routes";
import seoSettingsRoutes from "./seoSettings.routes";

const router: Router = Router();

/**
 * Public health probe.
 * GET /api/health -> { success: true, data: { status: "ok", time } }
 */
router.get("/health", (_req, res) => {
  res.json({
    success: true,
    data: {
      status: "ok",
      service: "leadslemonade-blog-backend",
      time: new Date().toISOString(),
    },
  });
});

router.use("/blog", blogRoutes);
router.use("/categories", categoryRoutes);
router.use("/seo-settings", seoSettingsRoutes);

export default router;
