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
  jadwal: z.string().min(1, {
    message: 'jadwal harus di isi',
  }),
  nomorContact: z.string().min(1, {
    message: 'no contact harus di isi',
  }),
  alamat: z.string().min(20, {
    message: 'deskripsi toko harus di isi minimal 20 kata',
  }),

  jamOprasional: z.string().min(10, {
    message: '  jam oprasional harus di isi',
  }),
});
