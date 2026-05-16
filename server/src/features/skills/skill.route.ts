import { Router } from "express";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import SkillController from "./skill.controller.js";

const skillRouter = Router();

skillRouter.get("/", asyncHandler(SkillController.getAll));

export default skillRouter;
