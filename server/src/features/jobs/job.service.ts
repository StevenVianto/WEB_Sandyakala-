import {
  BadRequestError,
  UnauthorizedError,
} from "../../common/utils/AppError.js";
import pool from "../../config/db.js";
import JobRepository from "./job.repository.js";
import type { CreateJobInput } from "./job.schema.js";

const JobService = {
  createJob: async (userId: number, data: CreateJobInput) => {

    const [umkmRows]: any = await pool.execute(
      "SELECT id_umkm, status FROM umkm_profiles WHERE user_id = ?",
      [userId],
    );

    if (umkmRows.length === 0) {
      throw new UnauthorizedError(
        "Akses ditolak. Anda belum mendaftar sebagai UMKM.",
      );
    }

    if (umkmRows[0].status !== "APPROVED") {
      throw new BadRequestError(
        "Data UMKM Anda masih dalam tahap verifikasi Admin.",
      );
    }

    const umkmId = umkmRows[0].id_umkm;

    const cleanSkills = data.skills
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    const uniqueSkills = [...new Set(cleanSkills)];

    if (uniqueSkills.length === 0) {
      throw new BadRequestError(
        "Keahlian/Skills tidak boleh kosong setelah divalidasi",
      );
    }

    const jobId = await JobRepository.createJob(umkmId, data, uniqueSkills);

    return jobId;
  },
};

export default JobService;
