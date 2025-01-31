import { z } from 'zod';

export const UserSchemaToko = z.object({
  namaToko: z
    .string()
    .min(1, {
      message: 'nama toko harus di isi',
    })
    .max(20, { message: 'tidak boleh lebih dari 25 huruf' }),
  alamat: z.string().min(14, {
    message: 'alamat harus lengkap ',
  }),
  provinsi: z.string().min(1, {
    message: 'provinsi harus di isi',
  }),
  kota: z.string().min(1, {
    message: 'kota harus di isi',
  }),
  kecamatan: z.string().min(1, {
    message: 'kecamatan harus di isi',
  }),
  kelurahan: z.string().min(1, {
    message: 'kelurahan harus di isi',
  }),
  katagories: z.string().min(1, {
    message: 'katagori harus di isi',
  }),
  jadwal: z.string().min(1, {
    message: 'jadwal harus di isi',
  }),
  Latitude: z.string().min(1, {
    message: 'garis lintang harus di isi',
  }),
  longitude: z.string().min(1, {
    message: 'garis bujur harus di isi',
  }),
  nomorContact: z.string().min(1, {
    message: 'no contact harus di isi',
  }),
  deskripsi: z.string().min(20, {
    message: 'deskripsi toko harus di isi minimal 20 kata',
  }),

  jamOprasional: z.string().min(10, {
    message: '  jam oprasional harus di isi',
  }),
});
