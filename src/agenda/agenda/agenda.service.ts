import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { AgendaSchema } from './agenda.validation';
import { stateAgenda } from './agenda.model';

@Injectable()
export class AgendaService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}
  async CreateAgenda(data: stateAgenda, id: string): Promise<stateAgenda> {
    const result = await this.validate.validate(AgendaSchema, data);
    const users = await this.prisma.user.findUnique({
      where: {
        email: id,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const toko = await this.prisma.agenda.create({
      data: {
        namaKegiatan: result.namaKegiatan,
        namaInstansi: result.namaInstansi,
        provinsi: result.provinsi,
        kota: result.kota,
        kategori: result.kategori,
        jadwal: result.jadwal,
        Jam: result.Jam,
        fee: result.fee,
        status: 'dibuat',
        kontak: result.kontak,
        deskripsiKegiatan: result.deskripsiKegiatan,
        fotoProfile: result.fotoProfile,
        background: result.background,
        userId: users.email,
        Latitude: result.Latitude,
        longitude: result.longitude,
      },
    });

    return toko;
  }
  async editAgenda(
    email: string,
    data: stateAgenda,
    id: string,
  ): Promise<stateAgenda> {
    const result = await this.validate.validate(AgendaSchema, data);
    const users = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const toko = await this.prisma.agenda.update({
      where: {
        id: id,
        userId: users.email,
      },
      data: {
        namaKegiatan: result.namaKegiatan,
        namaInstansi: result.namaInstansi,
        provinsi: result.provinsi,
        kota: result.kota,
        kategori: result.kategori,
        jadwal: result.jadwal,
        Jam: result.Jam,
        fee: result.fee,
        status: 'dibuat',
        kontak: result.kontak,
        deskripsiKegiatan: result.deskripsiKegiatan,
        fotoProfile: result.fotoProfile,
        background: result.background,
        userId: users.email,
        Latitude: result.Latitude,
        longitude: result.longitude,
      },
    });

    return toko;
  }
  async deleteAgenda(id: string): Promise<stateAgenda> {
    const users = await this.prisma.user.findUnique({
      where: {
        email: id,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const toko = await this.prisma.agenda.delete({
      where: {
        id: id,
        userId: users.email,
      },
    });

    return toko;
  }

  async FindAgenda(skip: number, limits: number) {
    try {
      const loker = await this.prisma.agenda.findMany({
        skip: (skip - 1) * limits,
        take: limits,
      });
      return loker;
    } catch (error) {
      throw new HttpException(`Internal Server Error ${error}`, 500);
    }
  }
  async Findagendabyid(id: string) {
    try {
      const loker = await this.prisma.agenda.findMany({
        where: {
          id: id,
        },
      });
      return loker;
    } catch (error) {
      throw new HttpException(`Internal Server Error ${error}`, 500);
    }
  }
  async FindagendabyKategories(skip: number, limits: number, cat: string) {
    try {
      const loker = await this.prisma.agenda.findMany({
        where: {
          kategori: cat,
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
