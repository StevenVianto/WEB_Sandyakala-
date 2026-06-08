import { Router } from "express";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import ReportsController from "./reports.controller.js";

const reportsRouter = Router();

reportsRouter.get(
  "/",
  asyncHandler(ReportsController.list),
);

reportsRouter.get(
  "/:slug",
  asyncHandler(ReportsController.detail),
);

reportsRouter.patch(
  "/:id/status",
  asyncHandler(ReportsController.updateStatus),
);

export default reportsRouter;
