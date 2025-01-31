import { Injectable, HttpException } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import { stateToko } from './lowongan.model';
import { UserSchemaToko } from './lowongan.validation';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class LowonganService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}

  async CreateToko(data: stateToko, id: string): Promise<stateToko> {
    const result = await this.validate.validate(UserSchemaToko, data);
    const users = await this.prisma.user.findUnique({
      where: {
        email: id,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const toko = await this.prisma.toko.createMany({
      data: {
        namaToko: result.namaToko,
        deskripsi: result.deskripsi,
        katagories: result.katagories,
        kota: result.kota,
        provinsi: result.provinsi,
        alamat: result.alamat,
        nomorContact: result.nomorContact,
        jadwal: result.jadwal,
        jamOprasional: result.jamOprasional,
        Latitude: result.Latitude,
        Kecamatan: result.kecamatan,
        Kelurahan: result.kelurahan,
        Longitude: result.longitude,
      },
    });
    return toko[0];
  }

  async UpdateToko(
    data: stateToko,
    email: string,
    id: string,
  ): Promise<stateToko> {
    const result = await this.validate.validate(UserSchemaToko, data);
    const users = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const toko = await this.prisma.toko.updateMany({
      where: {
        id: id,
        AuthorId: users.email,
      },
      data: {
        namaToko: result.namaToko,
        deskripsi: result.deskripsi,
        katagories: result.katagories,
        kota: result.kota,
        provinsi: result.provinsi,
        alamat: result.alamat,
        nomorContact: result.nomorContact,
        jadwal: result.jadwal,
        jamOprasional: result.jamOprasional,
        Latitude: result.Latitude,
        Kecamatan: result.kecamatan,
        Kelurahan: result.kelurahan,
        Longitude: result.longitude,
      },
    });
    return toko[0];
  }
}
