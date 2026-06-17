import { z } from "zod";

export const registerSchema = z.object({
  fullname: z
    .string()
    .min(1, "Fullname wajib diisi"),
    
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
    
  password: z
    .string()
    .min(6, "Password minimal 6 karakter"),
    
  role: z.enum(['USER', 'UMKM']).default('USER'),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
    
  password: z
    .string()
    .min(1, "Password wajib diisi"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;