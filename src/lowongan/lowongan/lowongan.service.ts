import { Injectable, HttpException } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import { stateLowongan } from './lowongan.model';
import { UserSchema } from './lowongan.validation';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class LowonganService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}

  async CreateLowongan(
    data: stateLowongan,
    id: string,
  ): Promise<stateLowongan> {
    const result = await this.validate.validate(UserSchema, data);
    const users = await this.prisma.user.findUnique({
      where: {
        email: id,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const Lowongan = await this.prisma.lowongan.create({
      data: {
        namaLowongan: result.namaLowongan,
        namaInstansi: result.namaInstansi,
        provinsi: result.provinsi,
        kota: result.kota,
        katagori: result.katagori,
        expired: result.expired,
        deskripsiLowongan: result.deskripsiLowongan,
        requirement: result.requirement,
        Salary: result.Salary,
        nocontact: result.nocontact,
        linkGform: result.linkGform,
        fotoProfile: result.fotoProfile,
        background: result.background,
        userId: users.email,
      },
    });

    const notification = await this.prisma.notifikasi.create({
      data: {
        judulPesan: 'selamat lowongan anda berhasil dibuat',
        StatusPesan: `lowongan anda ${Lowongan.namaLowongan} berhasil dibuat`,
        keterangan: 'String',
        statusNotiv: 'lowongan berhasil dibuat',
        NotivId: users.email,
      },
    });
    if (!notification.statusNotiv) {
      throw new HttpException('User not found', 404);
    }

    return Lowongan;
  }

  async UpdateLowongan(
    data: stateLowongan,
    email: string,
    id: string,
  ): Promise<stateLowongan> {
    const result = await this.validate.validate(UserSchema, data);
    const users = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const toko = await this.prisma.lowongan.updateMany({
      where: {
        id: id,
        userId: users.email,
      },
      data: {
        namaLowongan: result.namaLowongan,
        namaInstansi: result.namaLowongan,
        provinsi: result.namaLowongan,
        kota: result.namaLowongan,
        katagori: result.namaLowongan,
        expired: result.namaLowongan,
        deskripsiLowongan: result.namaLowongan,
        requirement: result.namaLowongan,
        Salary: result.namaLowongan,
        nocontact: result.namaLowongan,
        linkGform: result.namaLowongan,
        fotoProfile: result.namaLowongan,
        background: result.namaLowongan,
      },
    });

    const notification = await this.prisma.notifikasi.updateMany({
      where: {
        NotivId: users.email,
      },
      data: {
        judulPesan: `selamat lowongan ${result.namaLowongan} anda berhasil diupdate`,
        StatusPesan: 'berhasil diupdate',
        keterangan: 'String',
        statusNotiv: 'ready',
        NotivId: users.email,
      },
    });
    if (!notification[0].statusNotiv) {
      throw new HttpException('User not found', 404);
    }

    return toko[0];
  }
  async DeleteLowongan(email: string, id: string): Promise<stateLowongan> {
    const users = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const loker = await this.prisma.lowongan.delete({
      where: {
        id: id,
        userId: users.email,
      },
    });

    const notification = await this.prisma.notifikasi.updateMany({
      where: {
        NotivId: users.email,
      },
      data: {
        judulPesan: `selamat lowongan anda berhasil dihapus`,
        StatusPesan: 'berhasil diupdate',
        keterangan: 'String',
        statusNotiv: 'ready',
        NotivId: users.email,
      },
    });
    if (!notification[0].statusNotiv) {
      throw new HttpException('User not found', 404);
    }
    return loker;
  }

  async Findlowongan(skip: number, limits: number): Promise<stateLowongan[]> {
    try {
      const loker = await this.prisma.lowongan.findMany({
        skip: (skip - 1) * limits,
        take: limits,
      });
      return loker;
    } catch (error) {
      throw new HttpException(`Internal Server Error ${error}`, 500);
    }
  }
  async Findlowonganbyid(id: string) {
    try {
      const loker = await this.prisma.lowongan.findMany({
        where: {
          id: id,
        },
      });
      return loker;
    } catch (error) {
      throw new HttpException(`Internal Server Error ${error}`, 500);
    }
  }
  async FindlowonganbyKategories(skip: number, limits: number, cat: string) {
    try {
      const loker = await this.prisma.lowongan.findMany({
        where: {
          katagori: cat,
        },
        orderBy: {
          CreateDateAt: 'desc',
        },
        skip: (skip - 1) * limits,
        take: limits,
      });
      return loker;
    } catch (error) {
      throw new HttpException(`Internal Server Error ${error}`, 500);
    }
  }
}
