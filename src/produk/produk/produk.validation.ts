import { z } from 'zod';

export const UserscemaProduk = z.object({
  namaProduk: z
    .string()
    .min(1, {
      message: 'nama toko harus di isi',
    })
    .max(20, { message: 'tidak boleh lebih dari 25 huruf' }),
  HargaProduk: z.string().min(14, {
    message: 'harga harus lengkap ',
  }),
  VariantProduk: z.string().array().optional(),
  hargavariant: z.string().array().optional(),
  fotoProduk: z.string().array().optional(),
  volume: z.string().min(1, {
    message: 'kelurahan harus di isi',
  }),
  berat: z.string().min(1, {
    message: 'katagori harus di isi',
  }),
  video: z.string().array().optional(),
  catProduk: z.string().min(1, {
    message: 'garis lintang harus di isi',
  }),
  tokoId: z.string().min(1, {
    message: 'garis bujur harus di isi',
  }),
  pesananId: z.string().min(1, {
    message: 'garis bujur harus di isi',
  }),
  Lokasi: z.string().min(1, {
    message: 'no contact harus di isi',
  }),
  diskon: z.string().min(1, {
    message: 'no contact harus di isi',
  }),
  detailProduk: z.string().min(50, {
    message: 'deskripsi produk harus di isi minimal 20 kata',
  }),

  jenisProduk: z.string().min(10, {
    message: '  jam oprasional harus di isi',
  }),
});
