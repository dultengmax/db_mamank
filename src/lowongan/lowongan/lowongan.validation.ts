import { z } from 'zod';

export const UserSchema = z.object({
  namaLowongan: z
    .string()
    .min(1, {
      message: 'nama lowongan harus di isi',
    })
    .max(25, { message: 'tidak boleh lebih dari 25 huruf' }),
  namaInstansi: z.string().min(1, {
    message: 'nama instansi harus di isi',
  }),
  provinsi: z.string().min(1, {
    message: 'provinsi harus di isi',
  }),
  kota: z.string().min(1, {
    message: 'kota harus di isi',
  }),
  katagori: z.string().min(1, {
    message: 'katagori harus di isi',
  }),
  expired: z.string().min(1, {
    message: 'expired harus di isi',
  }),
  nocontact: z.string().min(1, {
    message: 'no contact harus di isi',
  }),
  linkGform: z.string(),

  deskripsiLowongan: z.string().min(100, {
    message: 'deskripsi harus di isi min 100 kata',
  }),

  requirement: z.string().min(50, {
    message: 'harus di isi min 50 huruf',
  }),

  Salary: z.string(),
  fotoProfile: z.string(),
  background: z.string(),
});
