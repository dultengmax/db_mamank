import { z } from 'zod';

export const UserSchemaRute = z.object({
  From: z
    .string()
    .min(10, {
      message: 'lokasi jemput harus di isi',
    })
    .max(500, { message: 'tidak boleh lebih dari 25 huruf' }),
  to: z.string().min(14, {
    message: 'alamat harus lengkap ',
  }),
  harga: z.string().min(1, {
    message: '  harga  harus di isi',
  }),
});
