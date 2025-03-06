import { z } from 'zod';

export const UserSchema = z.object({
  userName: z
    .string()
    .min(1, {
      message: 'UserName Harus Di isi',
    })
    .max(100, {
      message: 'UserName Tidak lebih dari 15 ',
    }),
  contact: z.string().min(1, {
    message: 'Email harus di isi',
  }),
  kota: z.string().min(2, {
    message: 'kota di isi minimal 8 karakter',
  }),
});

export const PasswordScema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email harus di isi',
    })
    .email({ message: 'email harus sesuai' }),

  password: z
    .string()
    .min(8, {
      message: 'password di isi minimal 8 karakter',
    })
    .regex(/[A-Z]/, {
      message: 'harus ada huruf besar dan angka',
    })
    .regex(/[0-9]/, {
      message: 'harus ada huruf besar dan angka',
    })
    .refine((data) => !/\s/.test(data), {
      message: 'tidak boleh di isi spasi',
    }),
  newPassword: z
    .string()
    .min(8, {
      message: 'password di isi minimal 8 karakter',
    })
    .regex(/[A-Z]/, {
      message: 'harus ada huruf besar dan angka',
    })
    .regex(/[0-9]/, {
      message: 'harus ada huruf besar dan angka',
    })
    .refine((data) => !/\s/.test(data), {
      message: 'tidak boleh di isi spasi',
    }),
});
export const ContactScema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email harus di isi',
    })
    .email({ message: 'email harus sesuai' }),

  contact: z
    .string()
    .min(8, {
      message: 'password di isi minimal 8 karakter',
    })
    .startsWith('62', { message: 'Must provide secure URL' })
    .regex(/[0-9]/, {
      message: 'harus ada huruf besar dan angka',
    })
    .refine((data) => !/\s/.test(data), {
      message: 'tidak boleh di isi spasi',
    }),
});
