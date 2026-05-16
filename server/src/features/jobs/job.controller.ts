import type { Request, Response } from "express";
import JobService from "./job.service.js";

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
};

export default JobController;
