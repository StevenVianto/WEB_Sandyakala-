import type { Request, Response } from "express";
import UmkmService from "./umkm.service.js";

const UmkmController = {
  register: async (req: Request, res: Response) => {
    const userId = (req.user as any).id;

    const result = await UmkmService.registerUmkm(userId, req.body, req.files);

    res.status(201).json({
      success: true,
      message:
        "Pendaftaran UMKM berhasil. Profil Anda sedang dalam proses verifikasi.",
      data: result,
    });
  },
};

export default UmkmController;
