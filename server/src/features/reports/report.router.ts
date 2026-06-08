import { Router } from "express";
import ReportController from "./report.controller.js";
import { uploadMiddleware } from "../../common/middlewares/upload.js";
import { validate } from "../../common/middlewares/validate.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import { createReportSchema } from "./report.schema.js";
import { safeGuard } from "../../common/middlewares/safeGuard.js";

const reportRouter = Router();

reportRouter.post(
  "/",
  safeGuard(["USER"]),
  uploadMiddleware.single("evidence"),
  validate(createReportSchema),
  asyncHandler(ReportController.create),
);

reportRouter.get(
  "/",
  safeGuard(["ADMIN"]),
  asyncHandler(ReportController.getAll),
);

export default reportRouter;
