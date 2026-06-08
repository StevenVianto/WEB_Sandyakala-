import { z } from "zod";

export const createReportSchema = z.object({
  job_id: z.coerce
    .number("Job ID harus berupa angka")
    .positive("Job ID harus positif"),

  category: z
    .string("Kategori wajib diisi")
    .min(3, "Kategori harus minimal 3 karakter")
    .max(100, "Kategori tidak boleh melebihi 100 karakter"),

  detail: z
    .string("Detail wajib diisi")
    .min(10, "Detail harus minimal 10 karakter"),
});

export type CreateReportInput = z.infer<typeof createReportSchema>;
