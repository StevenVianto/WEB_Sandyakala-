import { Router } from "express";
import authRoute from "../features/auth/auth.routes.js";
import umkmRouter from "../features/umkm/umkm.routes.js";
import { safeGuard } from "../common/middlewares/safeGuard.js";
import skillRouter from "../features/skills/skill.route.js";
import jobRouter from "../features/jobs/job.route.js";
import applicationRouter from "../features/applications/application.route.js";
<<<<<<< HEAD
=======
import taskRoutes from "../features/tasks/task.route.js";
import freshGraduateRouter from "../features/freshgraduate/freshgraduate.routes.js";
import reportsRouter from "../features/reports/reports.routes.js";
>>>>>>> 28ba8fd211518570253587f0d305f7fd3cfcd065

const router = Router();

router.use("/auth", authRoute);
router.use("/umkm", safeGuard(["USER", "UMKM", "ADMIN"]), umkmRouter);
router.use("/skills", safeGuard(["UMKM"]), skillRouter);
router.use("/jobs", jobRouter); // safeGuard diterapkan di dalam job.route.ts
<<<<<<< HEAD
router.use("/applications", applicationRouter);
=======
router.use("/applications", applicationRouter); // safeGuard diterapkan di dalam application.route.ts
router.use("/tasks", taskRoutes);
router.use(
  "/freshgraduate",
  safeGuard(["USER", "UMKM", "ADMIN"]),
  freshGraduateRouter,
);
router.use("/reports", safeGuard(["USER", "UMKM", "ADMIN"]), reportsRouter);
>>>>>>> 28ba8fd211518570253587f0d305f7fd3cfcd065

export default router;
