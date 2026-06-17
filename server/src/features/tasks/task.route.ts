import { Router } from "express";
import TaskController from "./task.controller.js";
import { validate } from "../../common/middlewares/validate.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import { submitTaskSchema, reviewTaskSchema } from "./task.schema.js";
import { safeGuard } from "../../common/middlewares/safeGuard.js";

const router = Router();

router.get(
  "/job/:jobId",
  safeGuard(["UMKM"]),
  asyncHandler(TaskController.getTasksByJob),
);

router.get(
  "/:taskId/revisions",
  safeGuard(["UMKM", "USER"]),
  asyncHandler(TaskController.getRevisions),
);

router.put(
  "/:taskId/review",
  safeGuard(["UMKM"]),
  validate(reviewTaskSchema),
  asyncHandler(TaskController.reviewTask),
);

router.put(
  "/:taskId/submit",
  safeGuard(["USER"]),
  validate(submitTaskSchema),
  asyncHandler(TaskController.submitTask),
);

export default router;
