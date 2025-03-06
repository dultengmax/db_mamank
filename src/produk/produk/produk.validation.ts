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
  resi: z.string().min(10, {
    message: 'foto paket harus di isi',
  }),
});
export const UserscemaTravel = z.object({
  pay: z
    .string()
    .min(1, {
      message: 'metode pembayaran',
    })
    .max(10, { message: 'tidak boleh lebih dari 25 huruf' }),
  harga: z.string().min(1, {
    message: 'harga harus lengkap ',
  }),
  jenisTravel: z.string().min(1, {
    message: 'volume harus di isi',
  }),
  mapto: z.string().min(1, {
    message: 'berat harus di isi',
  }),
  to: z.string().min(1, {
    message: 'tujuan harus di isi',
  }),
  from: z.string().min(1, {
    message: 'penjemputan harus di isi',
  }),
  mapfrom: z.string().min(1, {
    message: 'jenis paket harus di isi',
  }),
  nomorPengirim: z.string().min(2, {
    message: 'no pengirim harus di isi',
  }),
  status: z.string().min(1, {
    message: 'nomor penerima ',
  }),
  image: z.string().min(1, {
    message: 'nomor penerima ',
  }),
  jadwal: z.string().min(1, {
    message: 'nomor penerima ',
  }),
  cityf: z.string().min(1, {
    message: 'nomor penerima ',
  }),
  cityt: z.string().min(1, {
    message: 'nomor penerima ',
  }),
  resi: z.string().min(1, {
    message: 'resi penerima ',
  }),

  namaPenumpang: z.string().min(1, {
    message: 'nama penumpang minimal 2 harus di isi',
  }),
});
