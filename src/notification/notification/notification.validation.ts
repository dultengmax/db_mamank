import { z } from 'zod';

export const NotivSchema = z.object({
  judulPesan: z
    .string()
    .min(2, {
      message: 'ulasan harus di isi',
    })
    .max(120, { message: 'tidak boleh lebih dari 120 huruf' }),
  StatusPesan: z.string().min(1, {
    message: 'bintang harus di isi',
  }),
  keterangan: z.string().min(1, {
    message: 'bintang harus di isi',
  }),
});
