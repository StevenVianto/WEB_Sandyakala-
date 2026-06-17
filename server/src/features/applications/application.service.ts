import { InternalServerError } from "../../common/utils/AppError.js";
import pool from "../../config/db.js";

const DEFAULT_STATS = {
  lamaran: 0,
  wawancara: 0,
  diterima: 0,
  ditolak: 0,
};

const ApplicationService = {
  // 1. Fungsi Statistik Bawaan Kamu
  getStats: async (userId: number) => {
    try {
      const [rows]: any = await pool.execute(
        `
          SELECT status, COUNT(*) as total
          FROM applications
          WHERE user_id = ?
          GROUP BY status
        `,
        [userId],
      );

      const stats = { ...DEFAULT_STATS };

      rows.forEach((row: { status?: string; total?: number }) => {
        if (row.status === "lamaran") stats.lamaran = Number(row.total) || 0;
        if (row.status === "wawancara")
          stats.wawancara = Number(row.total) || 0;
        if (row.status === "diterima")
          stats.diterima = Number(row.total) || 0;
        if (row.status === "ditolak") stats.ditolak = Number(row.total) || 0;
      });

      return stats;
    } catch (error: any) {
      throw new InternalServerError(
        error?.message || "Gagal mengambil statistik lamaran.",
      );
    }
  },

  // --- 2. FUNGSI APPLY BARU (DENGAN REQ.BODY DAN FILE CV) ---
  apply: async (userId: number, jobId: number, body: any, file: Express.Multer.File) => {
    try {
      const defaultStatus = "lamaran"; // Status awal lamaran masuk

      // Query MySQL untuk menyimpan data lamaran baru
      // CATATAN: Sesuaikan nama kolom (user_id, job_id, status) dengan tabel 'applications' milikmu
      const [result]: any = await pool.execute(
        `
          INSERT INTO applications (user_id, job_id, status)
          VALUES (?, ?, ?)
        `,
        [userId, jobId, defaultStatus],
      );

      // Return data response ke controller agar proses berhasil dikompilasi
      return {
        applicationId: result.insertId,
        userId,
        jobId,
        status: defaultStatus,
        fullname: body.fullname,         // Data dari input teks Flutter
        last_education: body.last_education, // Data dari input teks Flutter
        fileName: file.originalname,     // Nama file CV asli yang diunggah
      };
    } catch (error: any) {
      throw new InternalServerError(
        error?.message || "Gagal memproses dan menyimpan lamaran pekerjaan.",
      );
    }
  },
};

export default ApplicationService;