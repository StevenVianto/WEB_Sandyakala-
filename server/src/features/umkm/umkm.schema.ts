import { z } from "zod";

export const registerUmkmSchema = z.object({
  nama_pemilik: z.string().min(1, "Nama pemilik wajib diisi"),
  nib: z.string().min(1, "NIB wajib diisi"),
  nama_usaha: z.string().min(1, "Nama usaha wajib diisi"),
  kategori_usaha: z.string().min(1, "Kategori usaha wajib diisi"),
  jumlah_karyawan: z.coerce.number().min(1, "Jumlah karyawan minimal 1"),
  alamat_usaha: z.string().min(1, "Alamat wajib diisi"),
  email_usaha: z.string().email("Format email tidak valid"),
  no_telp_usaha: z.string().min(1, "Nomor telepon wajib diisi"),
});

export type RegisterUmkmInput = z.infer<typeof registerUmkmSchema>;
