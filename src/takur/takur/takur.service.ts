import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { StateTakur } from './takur.model';
import { takurSchema } from './takur.validation';

@Injectable()
export class TakurService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}

  //   buat tabungan hewan qurban tahun 2025
  async CreateTakur(data: StateTakur, email: string): Promise<StateTakur> {
    const result = await this.validate.validate(takurSchema, data);
    const users = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const tabungan = await this.prisma.takur.create({
      data: {
        UserId: users.email,
        transaksi: result.transaksi,
        status: result.status,
        hewan: result.hewan,
        Class: result.Class,
      },
    });

    const notiv = await this.prisma.notifikasi.create({
      data: {
        judulPesan: 'Tabungan Qurban anda berhasil dibuat',
        keterangan: `Anda membuat tabungan Qurban ${result.hewan} `,
        statusNotiv: 'pending',
        StatusPesan: users.email,
      },
    });
    if (notiv.judulPesan) {
    }
    return tabungan;
  }
  async UpdateTakur(
    data: StateTakur,
    email: string,
    id: string,
  ): Promise<StateTakur> {
    const result = await this.validate.validate(takurSchema, data);
    const users = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const tabungan = await this.prisma.takur.update({
      where: {
        id: id,
        UserId: users.email,
      },
      data: {
        transaksi: result.transaksi,
        status: result.status,
        hewan: result.hewan,
        Class: result.Class,
      },
    });

    const notiv = await this.prisma.notifikasi.create({
      data: {
        judulPesan: `anda berhasil menabung ${result.transaksi}`,
        keterangan: `Anda membuat tabungan Qurban ${result.hewan} `,
        statusNotiv: 'pending',
        StatusPesan: users.email,
      },
    });
    if (notiv.judulPesan) {
    }
    return tabungan;
  }
  async findTakur(email: string, id: string): Promise<StateTakur[]> {
    const users = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const tabungan = await this.prisma.takur.findMany({
      where: {
        id: id,
        UserId: users.email,
      },
    });

    return tabungan;
  }
}
