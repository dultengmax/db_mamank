import { z } from 'zod';

export const KomunitasSchema = z.object({
  lokasi: z
    .string()
    .min(2, {
      message: 'ulasan harus di isi',
    })
    .max(120, { message: 'tidak boleh lebih dari 120 huruf' }),
  namaKomunitas: z.string().min(1, {
    message: 'nama harus di isi',
  }),
  alamat: z.string().min(20, {
    message: 'alamat harus di isi',
  }),
  deskripsi: z.string().min(40, {
    message: 'bintang harus di isi',
  }),
  dashboard: z.string().min(1, {
    message: 'bintang harus di isi',
  }),
  fotoProfile: z.string().min(1, {
    message: 'bintang harus di isi',
  }),
  contact: z.string().min(1, {
    message: 'nomor contact harus di isi',
  }),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  tiktok: z.string().optional(),
  iklan: z.string().array().optional(),
});
