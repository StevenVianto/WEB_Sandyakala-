import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { BadRequestError } from "../../common/utils/AppError.js";

export const AuthController = {
  register: async (req: Request, res: Response) => {
    // --- TAMBAHKAN LOG INI ---
    console.log("--- DEBUG DATA DARI FLUTTER ---");
    console.log(JSON.stringify(req.body, null, 2));
    console.log("--------------------------------");
    // ------------------------

    const user = await AuthService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      data: user,
    });
  },

  login: async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: result,
    });
  },
<<<<<<< HEAD
};
=======

  updateAccount: async (req: Request, res: Response) => {
  const userId = Number(req.user!.id);
  const { username, password } = req.body;

  if (!username && !password) {
    throw new BadRequestError("Isi minimal username atau password baru.");
  }

  await AuthService.updateAccount(userId, { username, password });
  res.status(200).json({ success: true, message: "Akun berhasil diperbarui." });
},

  getMe: async (req: Request, res: Response) => {
    const userId = req.user.id;
    const user = await AuthService.getMe(userId);

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data user",
      data: user,
    });
  },
};
>>>>>>> 28ba8fd211518570253587f0d305f7fd3cfcd065
