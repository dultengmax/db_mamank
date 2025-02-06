import { z } from 'zod';

export const LaporanSchema = z.object({
  ulasan: z
    .string()
    .min(2, {
      message: 'ulasan harus di isi',
    })
    .max(120, { message: 'tidak boleh lebih dari 120 huruf' }),
  nama: z.string().min(1, {
    message: 'nama harus di isi',
  }),
  produkId: z.string().min(1, {
    message: 'bintang harus di isi',
  }),
  AuthorId: z.string().min(1, {
    message: 'bintang harus di isi',
  }),
  AgendaId: z.string().min(1, {
    message: 'bintang harus di isi',
  }),
  tokoId: z.string().min(1, {
    message: 'bintang harus di isi',
  }),
});
