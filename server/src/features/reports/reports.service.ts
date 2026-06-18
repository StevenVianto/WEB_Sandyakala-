import { BadRequestError, NotFoundError } from "../../common/utils/AppError.js";
import ReportsRepository from "./reports.repository.js";

const ReportsService = {
  getAllReports: async () => {
    return await ReportsRepository.findAll();
  },

  getReportBySlug: async (slug: string) => {
    const report = await ReportsRepository.findBySlug(slug);
    if (!report) {
      throw new NotFoundError("Laporan tidak ditemukan");
    }
    return report;
  },

  updateReportStatus: async (id: number, status: string) => {
    const validStatuses = ["Menunggu", "Valid", "Peringatan", "Blokir", "Ditolak"];
    if (!validStatuses.includes(status)) {
      throw new BadRequestError("Status laporan tidak valid");
    }

    const report = await ReportsRepository.findById(id);
    if (!report) {
      throw new NotFoundError("Laporan tidak ditemukan");
    }

    await ReportsRepository.updateStatus(id, status);
    return { id, status };
  },
  createReport: async (
  reporterUserId: number,
  reportedUmkmId: number,
  violationCategory: string,
  reportReason: string,
) => {
  if (!violationCategory?.trim()) throw new BadRequestError("Kategori pelanggaran wajib diisi.");
  if (!reportReason?.trim()) throw new BadRequestError("Alasan pelaporan wajib diisi.");
  if (reportReason.trim().length < 20) throw new BadRequestError("Alasan pelaporan minimal 20 karakter.");
  return await ReportsRepository.createReport(reporterUserId, reportedUmkmId, violationCategory.trim(), reportReason.trim());
},

getMyReports: async (userId: number) => {
  return await ReportsRepository.findByUmkmUserId(userId);
},
};

export default ReportsService;
