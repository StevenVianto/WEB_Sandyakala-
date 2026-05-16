import { Router } from "express";
import { requireAuth } from "../../common/middlewares/auth.js";
import { validate } from "../../common/middlewares/validate.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import { createJobSchema } from "./job.schema.js";
import JobController from "./job.controller.js";

const jobRouter = Router();

jobRouter.post(
  "/",
  requireAuth,
  validate(createJobSchema),
  asyncHandler(JobController.create),
);

export default jobRouter;
