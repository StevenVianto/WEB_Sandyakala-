import type { Request, Response } from "express";
import JobService from "./job.service.js";
import { BadRequestError } from "../../common/utils/AppError.js";

const JobController = {
  create: async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const jobId = await JobService.createJob(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Lowongan pekerjaan berhasil dipublikasikan",
      data: {
        job_id: jobId,
      },
    });
  },

  getDetail: async (req: Request, res: Response) => {
    const jobId = Number(req.params.id);

    if (isNaN(jobId)) {
      throw new BadRequestError("ID Lowongan tidak valid");
    }

    const jobDetail = await JobService.getJobDetail(jobId);

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil detail lowongan",
      data: jobDetail,
    });
  },
};

export default JobController;
