import { Injectable, HttpException } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import { stateCarousel, stateToko } from './toko.model';
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
        email: id,
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
        alamat: result.alamat,
        jadwal: result.jadwal,
        jamOprasional: result.jamOprasional,
        AuthorId: users.email,
      },
    });

    const notification = await this.prisma.notifikasi.create({
      data: {
        judulPesan: `selamat rute dari ${result.From} sampai ${result.to}`,
        StatusPesan: `rute berhasil dibuat pada ${toko.CreateDateAt}`,
        keterangan: 'bismillah semoga lancar usahanya  ',
        statusNotiv: 'toko berhasil dibuat',
        NotivId: users.email,
      },
    });
    if (!notification.statusNotiv) {
      throw new HttpException('User not found', 404);
    }
    return toko;
  }

  async UpdateRute(data: stateToko, email: string, id: string): Promise<Rute> {
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
        id: id,
      },
      data: {
        From: result.From,
        to: result.to,
        alamat: result.alamat,
        jadwal: result.jadwal,
        jamOprasional: result.jamOprasional,
      },
    });

    if (!toko.count) {
      throw new HttpException('User not found', 404);
    }

    return toko[0];
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

  async addCarousel(data: string): Promise<stateCarousel> {
    try {
      const toko = await this.prisma.carousel.create({
        data: {
          carousel: data,
        },
      });
      return toko;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
}
