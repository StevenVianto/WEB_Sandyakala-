import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../common/utils/AppError.js";
import pool from "../../config/db.js";
import ApplicationRepository from "./application.repository.js";

const ApplicationService = {
  applyForJob: async (userId: number, jobId: number) => {
    const [fgRows]: any = await pool.execute(
      "SELECT id, status FROM fg_profiles WHERE user_id = ?",
      [userId],
    );

    if (fgRows.length === 0) {
      throw new BadRequestError(
        "Anda harus melengkapi profil terlebih dahulu sebelum melamar pekerjaan.",
      );
    }

    if (fgRows[0].status !== "APPROVED") {
      throw new BadRequestError(
        "Profil Anda masih dalam tahap verifikasi oleh Admin. Silakan tunggu hingga disetujui.",
      );
    }

    const [jobRows]: any = await pool.execute(
      "SELECT id, deadline FROM jobs WHERE id = ?",
      [jobId],
    );

    if (jobRows.length === 0) {
      throw new NotFoundError("Lowongan pekerjaan tidak ditemukan.");
    }

    const today = new Date();
    const deadline = new Date(jobRows[0].deadline);
    if (today > deadline) {
      throw new BadRequestError(
        "Maaf, lowongan ini sudah ditutup karena melewati batas waktu (deadline).",
      );
    }

    const hasApplied = await ApplicationRepository.checkAlreadyApplied(
      userId,
      jobId,
    );
    if (hasApplied) {
      throw new BadRequestError(
        "Anda sudah melamar ke lowongan ini sebelumnya.",
      );
    }

    const applicationId = await ApplicationRepository.applyJob(userId, jobId);

    return applicationId;
  },

  getUmkmApplicants: async (userId: number, query: any) => {
    const [umkmRows]: any = await pool.execute(
      "SELECT id_umkm AS id, status FROM umkm_profiles WHERE user_id = ?",
      [userId],
    );

    if (umkmRows.length === 0) {
      throw new UnauthorizedError(
        "Akses ditolak. Anda belum mendaftar sebagai UMKM.",
      );
    }

    if (umkmRows[0].status !== "APPROVED") {
      throw new BadRequestError(
        "Profil UMKM Anda belum diverifikasi atau sedang ditangguhkan.",
      );
    }

    const umkmId = umkmRows[0].id;

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Number(query.limit) || 10);
    const offset = (page - 1) * limit;

    const result = await ApplicationRepository.getApplicantsByUmkm(
      umkmId,
      limit,
      offset,
    );

    return {
      applicants: result.data,
      meta: {
        page,
        limit,
        total_data: result.total,
        total_pages: Math.ceil(result.total / limit),
      },
    };
  },
};

export default ApplicationService;
