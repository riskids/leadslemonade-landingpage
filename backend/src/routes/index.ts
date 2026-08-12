import { Router } from "express";
import authRoutes from "./auth.routes";
import blogRoutes from "./blog.routes";
import categoryRoutes from "./category.routes";
import seoSettingsRoutes from "./seoSettings.routes";

const router: Router = Router();

router.get("/health", (_req, res) => {
  res.json({ success: true, data: { status: "ok", service: "leadslemonade-blog-backend", time: new Date().toISOString() } });
});

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);
router.use("/categories", categoryRoutes);
router.use("/seo-settings", seoSettingsRoutes);

export default router;
