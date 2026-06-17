import type { Request, Response } from "express";
import { BadRequestError } from "../../common/utils/AppError.js";
import ApplicationService from "./application.service.js";

const ApplicationController = {
  // 1. Fungsi Statistik Lamaran
  getStats: async (req: Request, res: Response) => {
    const userId = Number(req.user?.id);

    if (!Number.isFinite(userId) || userId <= 0) {
      throw new BadRequestError("User ID tidak valid.");
    }

    const data = await ApplicationService.getStats(userId);

    res.status(200).json({
      success: true,
      data,
    });
  },

  // 2. Fungsi Melamar Kerja (Menangkap File CV dari Flutter)
  apply: async (req: Request, res: Response) => {
    const userId = Number(req.user?.id);
    const jobId = Number(req.params.jobId);
    const file = req.file; // Menangkap file CV yang dikirim dari Flutter via uploadMiddleware

    // Validasi User Login
    if (!userId) {
      throw new BadRequestError("User tidak terautentikasi.");
    }

    // Validasi File CV
    if (!file) {
      throw new BadRequestError("File CV wajib diunggah.");
    }

    // Memanggil fungsi apply yang ada di ApplicationService
    const data = await ApplicationService.apply(userId, jobId, req.body, file);

    res.status(201).json({
      success: true,
      message: "Lamaran berhasil dikirim!",
      data,
    });
  },
};

export default ApplicationController;