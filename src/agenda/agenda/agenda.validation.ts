import { z } from 'zod';

export const AgendaSchema = z.object({
  namaKegiatan: z
    .string()
    .min(2, {
      message: 'nama kegiatan harus di isi',
    })
    .max(25, { message: 'tidak boleh lebih dari 25 huruf' }),
  namaInstansi: z.string().min(1, {
    message: 'nama penyelengara harus di isi',
  }),
  provinsi: z.string().min(1, {
    message: 'provinsi harus di pilih',
  }),
  kota: z.string().min(1, {
    message: 'kota harus di pilih',
  }),
  kategori: z.string().min(1, {
    message: 'katagori harus di isi',
  }),
  expired: z.string().min(1, {
    message: 'jadwal harus di isi',
  }),
  Jam: z.string().min(1, {
    message: 'jam kegiatan harus di isi',
  }),
  jadwal: z.string().min(1, {
    message: 'jadwal kegiatan harus di isi',
  }),
  fee: z.string().min(1, {
    message: 'jadwal kegiatan harus di isi',
  }),
  kontak: z.string().min(1, {
    message: 'no contact harus di isi',
  }),

  deskripsiKegiatan: z.string().min(10, {
    message: 'deskripsi kegiatan harus di isi',
  }),

  fotoProfile: z.string(),
  background: z.string(),
  Latitude: z.string(),
  longitude: z.string(),
});
