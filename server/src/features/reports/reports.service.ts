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
};

export default ReportsService;
