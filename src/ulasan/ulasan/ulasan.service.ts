import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { StateUlasan } from './ulasan.model';
import { UserSchemaUlasan } from './ulasan.validation';

@Injectable()
export class UlasanService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}
  async AddUlasan(
    data: StateUlasan,
    id: string,
    email: string,
  ): Promise<StateUlasan> {
    try {
      const result = this.validate.validate(UserSchemaUlasan, data);
      const ulasan = await this.prisma.ulasanProduk.create({
        data: {
          ulasan: result.ulasan,
          start: result.start,
          fotoUlasan: result.fotoUlasan,
          produkId: id,
          AuthorId: email,
        },
      });
      return ulasan;
    } catch (err) {
      console.log(err);
      throw new Error('Terjadi kesalahan dalam menyimpan ulasan');
    }
  }
  async updateUlasan(
    data: StateUlasan,
    ulasanId: string,
    email: string,
  ): Promise<StateUlasan> {
    try {
      const result = this.validate.validate(UserSchemaUlasan, data);
      const ulasan = await this.prisma.ulasanProduk.update({
        where: {
          id: ulasanId,
          AuthorId: email,
        },
        data: {
          ulasan: result.ulasan,
          start: result.start,
          fotoUlasan: result.fotoUlasan,
        },
      });
      return ulasan;
    } catch (err) {
      console.log(err);
      throw new Error('Terjadi kesalahan dalam menyimpan ulasan');
    }
  }
  async deleteUlasan(id: string): Promise<StateUlasan> {
    try {
      const ulasan = await this.prisma.ulasanProduk.delete({
        where: {
          id: id,
        },
      });
      return ulasan;
    } catch (err) {
      console.log(err);
      throw new Error('Terjadi kesalahan dalam menyimpan ulasan');
    }
  }
  async ulasanbyProduk(id: string): Promise<StateUlasan[]> {
    try {
      const ulasan = await this.prisma.ulasanProduk.findMany({
        where: {
          produkId: id,
        },
      });
      return ulasan;
    } catch (err) {
      console.log(err);
      throw new Error('Terjadi kesalahan dalam menyimpan ulasan');
    }
  }
}
