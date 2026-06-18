import { Router } from "express";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import ReportsController from "./reports.controller.js";

const reportsRouter = Router();

reportsRouter.get(
  "/",
  asyncHandler(ReportsController.list),
);

reportsRouter.get(
  "/umkm/me",
  asyncHandler(ReportsController.myReports),
);


reportsRouter.get(
  "/:slug",
  asyncHandler(ReportsController.detail),
);

reportsRouter.patch(
  "/:id/status",
  asyncHandler(ReportsController.updateStatus),
);

reportsRouter.post(
  "/",
  asyncHandler(ReportsController.create),
);

export default reportsRouter;
