import { Injectable, HttpException } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import { stateToko } from './toko.model';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Rute } from '@prisma/client';
import { UserSchemaRute } from './toko.validation';

@Injectable()
export class TokoService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}

  async CreateRute(data: stateToko, id: string): Promise<Rute> {
    const result = await this.validate.validate(UserSchemaRute, data);
    const users = await this.prisma.user.findUnique({
      where: {
        userName: id,
        role: 'admin',
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const toko = await this.prisma.rute.create({
      data: {
        From: result.From,
        to: result.to,
        alamat: result.to,
        AuthorId: users.email,
        harga: result.harga,
      },
    });
    const reverse = await this.prisma.rute.create({
      data: {
        From: result.to,
        to: result.From,
        alamat: result.to,
        AuthorId: users.email,
        harga: result.harga,
      },
    });

    const notification = await this.prisma.notifikasi.create({
      data: {
        judulPesan: `selamat rute dari ${result.From} sampai ${result.to} berhasil dibuat`,
        StatusPesan: `rute berhasil dibuat pada ${toko.CreateDateAt}`,
        keterangan: 'bismillah semoga lancar usahanya  ',
        statusNotiv: 'toko berhasil dibuat',
        NotivId: users.email,
      },
    });
    if (!notification.statusNotiv) {
      throw new HttpException('User not found', 404);
    }
    return toko && reverse;
  }
  async UpdateRute(data: stateToko, from: string, to: string): Promise<Rute> {
    const result = await this.validate.validate(UserSchemaRute, data);
    const users = await this.prisma.user.findMany({
      where: {
        role: 'admin',
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const toko = await this.prisma.rute.updateMany({
      where: {
        From: from,
        to: to,
      },
      data: {
        From: result.From,
        to: result.to,
        alamat: result.to,
        harga: result.harga,
      },
    });
    const reverse = await this.prisma.rute.updateMany({
      where: {
        From: to,
        to: from,
      },
      data: {
        From: result.to,
        to: result.From,
        alamat: result.to,
        harga: result.harga,
      },
    });

    if (!toko.count) {
      throw new HttpException('User not found', 404);
    }

    return toko[0] && reverse[0];
  }
  async DeleteRute(id: string): Promise<Rute> {
    const users = await this.prisma.user.findMany({
      where: {
        role: 'admin',
      },
    });
    if (!users) {
      throw new HttpException('User not found', 404);
    }
    const toko = await this.prisma.rute.delete({
      where: {
        id: id,
      },
    });

    return toko;
  }
  async FindRute(id: string): Promise<stateToko> {
    try {
      const toko = await this.prisma.rute.findUnique({
        where: {
          id: id,
        },
      });
      return toko;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async FindHarga(from: string, to: string): Promise<stateToko[]> {
    try {
      const toko = await this.prisma.rute.findMany({
        where: {
          From: from,
          to: to,
        },
      });
      return toko;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async FindRuteMany(): Promise<stateToko[]> {
    try {
      const toko = await this.prisma.rute.findMany({
        orderBy: {
          CreateDateAt: 'desc',
        },
      });
      return toko;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async FindTokoSearch(name: string): Promise<stateToko[]> {
    try {
      if (name == null || name == '')
        throw new HttpException('tidak ada pencarian', 405);
      const toko = await this.prisma.rute.findMany({
        where: {
          From: {
            contains: name,
          },
        },
      });
      return toko;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async addImageRute(data: string, id: string) {
    const url = `/uploads/${data}`;

    try {
      const cekid = await this.prisma.rute.findMany({
        where: {
          id: id,
        },
      });
      if (!cekid) {
        return null;
      }
      const toko = await this.prisma.rute.update({
        where: {
          id: id,
        },
        data: {
          image: url,
        },
      });
      return toko;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async addImageCarousel(data: string) {
    const url = `/uploads/${data}`;
    try {
      const toko = await this.prisma.carousel.create({
        data: {
          carousel: url,
        },
      });
      return toko;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async FindImageCarousel() {
    try {
      const toko = await this.prisma.carousel.findMany({});
      return toko;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async DeleteImagCarousel(data: string, id: string) {
    try {
      const toko = await this.prisma.carousel.delete({
        where: {
          id: id,
        },
      });
      return toko;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async DeleteImageRute(data: string, id: string) {
    try {
      const toko = await this.prisma.rute.update({
        where: {
          id: id,
        },
        data: {
          image: null,
        },
      });
      return toko;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
}
