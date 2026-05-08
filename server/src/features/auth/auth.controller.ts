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

  getUsers: async (_: Request, res: Response, next: Function) => {
    try {
      const users = await AuthService.getAllUsers();
      res.status(200).json({
        status: "success",
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
};
