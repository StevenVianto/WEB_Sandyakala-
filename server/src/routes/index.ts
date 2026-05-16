import { Router } from "express";
import authRoute from "../features/auth/auth.routes.js";
import umkmRouter from "../features/umkm/umkm.routes.js";
import { safeGuard } from "../common/middlewares/safeGuard.js";
import skillRouter from "../features/skills/skill.route.js";
import jobRouter from "../features/jobs/job.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/umkm", safeGuard(["UMKM"]), umkmRouter);
router.use("/skills", safeGuard(["UMKM"]), skillRouter);
router.use("/jobs", safeGuard(["UMKM", "USER"]), jobRouter);

export default router;
