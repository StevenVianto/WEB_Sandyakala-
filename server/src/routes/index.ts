import { Router } from "express";
import authRoute from "../features/auth/auth.routes.js";
import umkmRouter from "../features/umkm/umkm.routes.js";
import { requireAuth } from "../common/middlewares/auth.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/umkm", requireAuth, umkmRouter);

export default router;
