import { z } from 'zod';

export const UserSchemaUlasan = z.object({
  ulasan: z
    .string()
    .min(2, {
      message: 'ulasan harus di isi',
    })
    .max(120, { message: 'tidak boleh lebih dari 120 huruf' }),
  start: z.string().min(1, {
    message: 'bintang harus di isi',
  }),
  produkId: z.string().min(1, {
    message: 'bintang harus di isi',
  }),
  AuthorId: z.string().min(1, {
    message: 'bintang harus di isi',
  }),
  fotoUlasan: z.string().array().min(1, { message: 'harus di isi' }),
});
