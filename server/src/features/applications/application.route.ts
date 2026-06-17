import { Router } from "express";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import { safeGuard } from "../../common/middlewares/safeGuard.js";
import ApplicationController from "./application.controller.js";

const applicationRouter = Router();

applicationRouter.get(
  "/stats",
  safeGuard(["USER"]),
  asyncHandler(ApplicationController.getStats),
);

export default applicationRouter;
