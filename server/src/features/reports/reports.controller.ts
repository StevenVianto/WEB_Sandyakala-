import type { Request, Response } from "express";
import ReportsService from "./reports.service.js";

const ReportsController = {
  list: async (_: Request, res: Response) => {
    const result = await ReportsService.getAllReports();
    res.status(200).json({
      success: true,
      data: result,
    });
  },

  detail: async (req: Request, res: Response) => {
    const slug = req.params.slug as string;
    const result = await ReportsService.getReportBySlug(slug);
    res.status(200).json({
      success: true,
      data: result,
    });
  },

  updateStatus: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const result = await ReportsService.updateReportStatus(Number(id), status);

    res.status(200).json({
      success: true,
      message: `Status laporan berhasil diperbarui menjadi ${status}.`,
      data: result,
    });
  },

  create: async (req: Request, res: Response) => {
  const reporterUserId = Number(req.user!.id);
  const { reported_umkm_id, violation_category, report_reason } = req.body;
  const result = await ReportsService.createReport(
    reporterUserId,
    Number(reported_umkm_id),
    violation_category,
    report_reason,
  );
  res.status(201).json({
    success: true,
    message: "Laporan berhasil dikirim.",
    data: result,
  });
},

myReports: async (req: Request, res: Response) => {
  const userId = Number(req.user!.id);
  const result = await ReportsService.getMyReports(userId);
  res.status(200).json({ success: true, data: result });
},
};

export default ReportsController;
