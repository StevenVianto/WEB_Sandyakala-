import type { Request, Response } from "express";
import { BadRequestError } from "../../common/utils/AppError.js";
import ApplicationService from "./application.service.js";

const ApplicationController = {
  apply: async (req: Request, res: Response) => {
    const jobId = Number(req.params.jobId);
    if (isNaN(jobId)) throw new BadRequestError("ID Lowongan tidak valid");

    const userId = Number(req.user!.id);

    await ApplicationService.applyForJob(userId, jobId);

    res.status(201).json({
      success: true,
      message: "Lamaran pekerjaan berhasil dikirim!",
    });
  },

  getUmkmApplicants: async (req: Request, res: Response) => {
    const userId = Number(req.user!.id);
    const result = await ApplicationService.getUmkmApplicants(
      userId,
      req.query,
    );

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil daftar pelamar masuk",
      data: result.applicants,
      meta: result.meta,
    });
  },
};

export default ApplicationController;
