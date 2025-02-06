import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { stateComunity } from './src.model';
import { KomunitasSchema } from './src.validation';

@Injectable()
export class ComunityService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}

  async addComunity(data: stateComunity, id: string): Promise<stateComunity> {
    try {
      const result = await this.validate.validate(KomunitasSchema, data);
      const users = await this.prisma.user.findUnique({
        where: {
          email: id,
        },
      });
      if (!users) {
        throw new HttpException('User not found', 404);
      }
      const Komunitas = await this.prisma.komunitas.create({
        data: {
          lokasi: result.lokasi,
          namaKomunitas: result.namaKomunitas,
          alamat: result.alamat,
          deskripsi: result.deskripsi,
          dashboard: result.dashboard,
          fotoProfile: result.fotoProfile,
          contact: result.contact,
          instagram: result.instagram,
          facebook: result.facebook,
          tiktok: result.tiktok,
          iklan: result.iklan,
        },
      });
      return Komunitas;
    } catch (error) {
      console.error(error);
      throw new Error('Error Get All Laporan');
    }
  }
  async EditComunity(
    data: stateComunity,
    email: string,
    id: string,
  ): Promise<stateComunity> {
    try {
      const result = await this.validate.validate(KomunitasSchema, data);
      const users = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!users) {
        throw new HttpException('User not found', 404);
      }
      const Komunitas = await this.prisma.komunitas.update({
        where: {
          id: id,
        },
        data: {
          lokasi: result.lokasi,
          namaKomunitas: result.namaKomunitas,
          alamat: result.alamat,
          deskripsi: result.deskripsi,
          dashboard: result.dashboard,
          fotoProfile: result.fotoProfile,
          contact: result.contact,
          instagram: result.instagram,
          facebook: result.facebook,
          tiktok: result.tiktok,
          iklan: result.iklan,
        },
      });
      return Komunitas;
    } catch (error) {
      console.error(error);
      throw new Error('Error Get All Laporan');
    }
  }
  async deleteComunity(id: string) {
    try {
      const Komunitas = await this.prisma.komunitas.delete({
        where: {
          id: id,
        },
      });
      return Komunitas;
    } catch (error) {
      console.error(error);
      throw new Error('Error Get All Laporan');
    }
  }
  async findComunityById(id: string) {
    try {
      const Komunitas = await this.prisma.komunitas.findMany({
        where: {
          id: id,
        },
      });
      return Komunitas;
    } catch (error) {
      console.error(error);
      throw new Error('Error Get All Laporan');
    }
  }
  async findComunity() {
    try {
      const Komunitas = await this.prisma.komunitas.findMany({
        orderBy: {
          CreateDateAt: 'desc',
        },
      });
      return Komunitas;
    } catch (error) {
      console.error(error);
      throw new Error('Error Get All Laporan');
    }
  }
  async findComunitybyName(name: string) {
    try {
      const Komunitas = await this.prisma.komunitas.findMany({
        where: { namaKomunitas: name },
        orderBy: {
          CreateDateAt: 'desc',
        },
      });
      return Komunitas;
    } catch (error) {
      console.error(error);
      throw new Error('Error Get All Laporan');
    }
  }
}
