import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}
  async AddNotification(
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
    const toko = await this.prisma.lowongan.createMany({
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

    return toko[0];
  }

  async editNotification(
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
    return toko[0];
  }
  async deleteNotification(email: string, id: string): Promise<stateLowongan> {
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
    return loker;
  }
}
