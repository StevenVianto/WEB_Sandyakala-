import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

export const AuthController = {
  async login(req: Request, res: Response) {
    const { email } = req.body;

    const data = await AuthService.login(email);

    res.json({
      message: "Login successful",
      data,
    });
  },
};
