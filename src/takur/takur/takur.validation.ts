import { z } from 'zod';

export const takurSchema = z.object({
  userId: z.string().min(2, {
    message: 'harus ada user',
  }),
  transaksi: z.string().min(1, {
    message: 'nama harus di isi',
  }),
  status: z.string().min(1, {
    message: 'status harus tampil',
  }),
  hewan: z.string().min(1, {
    message: 'data hewan',
  }),
  Class: z.string().min(1, {
    message: 'data class',
  }),
  riwayat: z.string().min(1, {
    message: 'data riwayat',
  }),
});
