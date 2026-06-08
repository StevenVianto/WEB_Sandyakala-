import type { Request, Response } from "express";
import ReportService from "./report.service.js";

const ReportController = {
  create: async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const file = req.file;

    const { job_id, category, detail } = req.body;

    await ReportService.CreateReport(
      {
        userId: Number(userId),
        jobId: job_id,
        category,
        detail,
      },
      file,
    );

    res.status(201).json({
      success: true,
      message: "Report successfully submitted",
    });
  },

  getAll: async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await ReportService.getAllReports({
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      message: "Reports successfully fetched",
      data: result.data,
      meta: result.meta,
    });
  },
};

export default ReportController;
