import { BadRequestError } from "../../common/utils/AppError.js";
import CloudinaryUtil from "../../common/utils/cloudinary.js";
import ReportRepository from "./report.repository.js";

export interface ReportPayload {
  userId: number;
  jobId: number;
  category: string;
  detail: string;
}

const ReportService = {
  CreateReport: async (payload: ReportPayload, file?: Express.Multer.File) => {
    const isAlreadyReported = await ReportRepository.checkExistingReport(
      payload.userId,
      payload.jobId,
    );

    if (isAlreadyReported) {
      throw new BadRequestError(
        "Anda sudah melaporkan pekerjaan ini sebelumnya.",
      );
    }

    let evidenceUrl: string | null = null;

    if (file) {
      evidenceUrl = await CloudinaryUtil.uploadFile(file, "reports_evidence");
    }

    const result = await ReportRepository.createReport({
      userId: payload.userId,
      jobId: payload.jobId,
      category: payload.category,
      detail: payload.detail,
      evidenceUrl: evidenceUrl,
    });

    return result;
  },

  getAllReports: async (filters: { page: number; limit: number }) => {
    return await ReportRepository.findAll(filters);
  },
};

export default ReportService;
