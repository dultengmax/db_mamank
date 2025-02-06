import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { StateLaporan } from './laporan.model';
import { LaporanSchema } from './laporan.validation';

@Injectable()
export class LaporanService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}

  async addLaporan(data: StateLaporan, id: string): Promise<StateLaporan> {
    try {
      const result = await this.validate.validate(LaporanSchema, data);
      const users = await this.prisma.user.findUnique({
        where: {
          email: id,
        },
      });
      if (!users) {
        throw new HttpException('User not found', 404);
      }
      const Lowongan = await this.prisma.laporan.create({
        data: {
          ulasan: result.ulasan,
          nama: result.nama,
          produkId: result.produkId,
          AuthorId: users.email,
          AgendaId: result.AgendaId,
          tokoId: result.tokoId,
        },
      });
      return Lowongan;
    } catch (error) {
      console.error(error);
      throw new Error('Error Get All Laporan');
    }
  }
  async editLaporan(data: StateLaporan, id: string): Promise<StateLaporan> {
    try {
      const result = await this.validate.validate(LaporanSchema, data);
      const users = await this.prisma.user.findUnique({
        where: {
          email: id,
        },
      });
      if (!users) {
        throw new HttpException('User not found', 404);
      }
      const Lowongan = await this.prisma.laporan.update({
        where: { id: id },
        data: {
          ulasan: result.ulasan,
          nama: result.nama,
          produkId: result.produkId,
          AuthorId: users.email,
          AgendaId: result.AgendaId,
          tokoId: result.tokoId,
        },
      });
      return Lowongan;
    } catch (error) {
      console.error(error);
      throw new Error('Error Get All Laporan');
    }
  }
  async findLaporan(id: string): Promise<StateLaporan[]> {
    try {
      const Lowongan = await this.prisma.laporan.findMany({
        where: { id: id },
      });
      return Lowongan;
    } catch (error) {
      console.error(error);
      throw new Error('Error Get All Laporan');
    }
  }
}
