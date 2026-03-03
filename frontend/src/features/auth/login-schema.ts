import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  // Ubah .min(6) menjadi .min(4)
  password: z.string().min(4, "Password minimal 4 karakter"), 
});
// Ini untuk mengambil tipe data dari schema di atas secara otomatis
export type LoginFormValues = z.infer<typeof loginSchema>;