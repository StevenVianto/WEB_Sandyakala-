import { Router } from "express";
import authRoute from "../features/auth/auth.routes.js";
import umkmRouter from "../features/umkm/umkm.routes.js";
import { requireAuth } from "../common/middlewares/auth.js";
import skillRouter from "../features/skills/skill.route.js";
import jobRouter from "../features/jobs/job.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/umkm", requireAuth, umkmRouter);
router.use("/skills", requireAuth, skillRouter);
router.use("/jobs", requireAuth, jobRouter);

export default router;
