import { Router } from "express";
import { validate } from "../../common/middlewares/validate.js";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import { createJobSchema } from "./job.schema.js";
import JobController from "./job.controller.js";

const jobRouter = Router();

jobRouter.post(
  "/",
  validate(createJobSchema),
  asyncHandler(JobController.create),
);

jobRouter.get("/:id", asyncHandler(JobController.getDetail));

export default jobRouter;
