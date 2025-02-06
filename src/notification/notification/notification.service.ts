import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { stateNotif } from 'src/toko/toko/toko.model';
import { ValidationService } from 'src/validation/validation/validation.service';
import { NotivSchema } from './notification.validation';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}
  async AddNotification(data: stateNotif, id: string): Promise<stateNotif> {
    const result = await this.validate.validate(NotivSchema, data);
    const users = await this.prisma.user.findUnique({
      where: {
        email: id,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const toko = await this.prisma.notifikasi.create({
      data: {
        judulPesan: result.judulPesan,
        StatusPesan: result.StatusPesan,
        keterangan: result.keterangan,
        statusNotiv: 'pending',
      },
    });

    return toko[0];
  }

  async editNotification(
    data: stateNotif,
    email: string,
    id: string,
  ): Promise<stateNotif> {
    const result = await this.validate.validate(NotivSchema, data);
    const users = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const toko = await this.prisma.notifikasi.updateMany({
      where: {
        id: id,
      },
      data: {
        judulPesan: result.judulPesan,
        StatusPesan: result.StatusPesan,
        keterangan: result.keterangan,
        statusNotiv: 'pending',
      },
    });
    return toko[0];
  }
  async deleteNotification(email: string, id: string) {
    const users = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const loker = await this.prisma.notifikasi.delete({
      where: {
        id: id,
      },
    });
    return loker;
  }
}
