import { z } from "zod";

export const registerSchema = z.object({
  fullname: z
    .string()
<<<<<<< HEAD
    .min(1, "Fullname wajib diisi"),
    
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
    
=======
    .min(1, "Fullname tidak boleh kosong"),
  email: z
    .string()
    .email("Format email tidak valid"),
>>>>>>> 28ba8fd211518570253587f0d305f7fd3cfcd065
  password: z
    .string()
    .min(6, "Password minimal 6 karakter"),
    
  role: z.enum(['USER', 'UMKM']).default('USER'),
});

export const loginSchema = z.object({
  email: z
    .string()
<<<<<<< HEAD
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
    
  password: z
    .string()
    .min(1, "Password wajib diisi"),
=======
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Password tidak boleh kosong"),
>>>>>>> 28ba8fd211518570253587f0d305f7fd3cfcd065
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;