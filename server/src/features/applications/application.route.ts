import { Router } from "express";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import ApplicationController from "./application.controller.js";
import { safeGuard } from "../../common/middlewares/safeGuard.js";

const applicationRouter = Router();

applicationRouter.get(
  "/umkm",
  safeGuard(["UMKM"]),
  asyncHandler(ApplicationController.getUmkmApplicants),
);

applicationRouter.post(
  "/:jobId/apply",
  safeGuard(["USER"]),
  asyncHandler(ApplicationController.apply),
);

export default applicationRouter;
