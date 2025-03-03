import { z } from 'zod';

export const SchemaTestimony = z.object({
  name: z
    .string()
    .min(1, {
      message: 'nama haru di isi',
    })
    .max(500, { message: 'tidak boleh lebih dari 25 huruf' }),
  pengalaman: z.string().min(1, {
    message: 'pengalaman harus di isi ',
  }),
  star: z.string().min(1, {
    message: '  star  harus di isi',
  }),
});
