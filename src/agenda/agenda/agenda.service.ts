import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { stateAgenda } from './lowongan.model';
import { AgendaSchema } from './agenda.validation';

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
}
