import { Router } from "express";
import { asyncHandler } from "../../common/middlewares/asyncHandler.js";
import { AuthController } from "./auth.controller.js";

const router = Router();

router.post("/login", asyncHandler(AuthController.login));
router.get("/users", asyncHandler(AuthController.getUsers));

export default router;
