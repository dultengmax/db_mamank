import { z } from 'zod';

export const UserscemaProduk = z.object({
  isipaket: z
    .string()
    .min(1, {
      message: 'isi paket harus jelas',
    })
    .max(300, { message: 'tidak boleh lebih dari 25 huruf' }),
  harga: z.string().min(1, {
    message: 'harga harus lengkap ',
  }),
  volume: z.string().min(1, {
    message: 'volume harus di isi',
  }),
  berat: z.string().min(1, {
    message: 'berat harus di isi',
  }),
  to: z.string().min(5, {
    message: 'tujuan harus di isi',
  }),
  from: z.string().min(5, {
    message: 'penjemputan harus di isi',
  }),
  jenisPaket: z.string().min(1, {
    message: 'jenis paket harus di isi',
  }),
  nomorPengirim: z.string().min(2, {
    message: 'no pengirim harus di isi',
  }),
  nomorPenerima: z.string().min(2, {
    message: 'nomor penerima ',
  }),
  namaPenerima: z.string().min(2, {
    message: 'nomor penerima ',
  }),
  namaPengirim: z.string().min(2, {
    message: 'nomor penerima ',
  }),
  cityf: z.string().min(2, {
    message: 'nomor penerima ',
  }),
  cityt: z.string().min(2, {
    message: 'nomor penerima ',
  }),

  fotoPaket: z.string().min(10, {
    message: 'foto paket harus di isi',
  }),
  fotoPenerima: z.string().min(10, {
    message: 'foto paket harus di isi',
  }),
});
