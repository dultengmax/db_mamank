import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';

@Injectable()
export class TravelService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}

  // async CreateTravel(data: StateTravel, id: string): Promise<Rute> {
  //   const result = await this.validate.validate(UserSchemaRute, data);
  //   const users = await this.prisma.user.findUnique({
  //     where: {
  //       email: id,
  //       role: 'admin',
  //     },
  //   });
  //   if (!users) {
  //     throw new HttpException('User not found', 404);
  //   }
  //   const toko = await this.prisma.rute.create({
  //     data: {
  //       From: result.From,
  //       to: result.to,
  //       alamat: result.alamat,
  //       jadwal: result.jadwal,
  //       jamOprasional: result.jamOprasional,
  //       AuthorId: users.email,
  //     },
  //   });

  //   const notification = await this.prisma.notifikasi.create({
  //     data: {
  //       judulPesan: `selamat rute dari ${result.From} sampai ${result.to}`,
  //       StatusPesan: `rute berhasil dibuat pada ${toko.CreateDateAt}`,
  //       keterangan: 'bismillah semoga lancar usahanya  ',
  //       statusNotiv: 'toko berhasil dibuat',
  //       NotivId: users.email,
  //     },
  //   });
  //   if (!notification.statusNotiv) {
  //     throw new HttpException('User not found', 404);
  //   }
  //   return toko;
  // }
}
