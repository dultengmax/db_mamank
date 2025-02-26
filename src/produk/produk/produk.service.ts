import { Injectable, HttpException } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UserscemaProduk } from './produk.validation';
import { Paket } from '@prisma/client';
import { StatePaket } from './produk.model';

@Injectable()
export class ProdukService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}

  async CreatePaket(data: StatePaket, id: string): Promise<Paket> {
    const result = await this.validate.validate(UserscemaProduk, data);
    const user = await this.prisma.user.findMany({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const produk = await this.prisma.paket.create({
      data: {
        isipaket: result.isipaket,
        from: result.from,
        to: result.to,
        berat: result.berat,
        volume: result.volume,
        jenisPaket: result.jenisPaket,
        nomorPengirim: result.nomorPengirim,
        nomorPenerima: result.nomorPenerima,
        harga: result.harga,
        fotoPaket: result.fotoPaket,
        fotoPenerima: result.fotoPenerima,
        cityf: data.cityf,
        cityt: data.cityt,
        jadwal: data.jadwal,
        pay: data.pay,
        jam: data.jam,
        namaPenerima: 'pending',
        namaPengirim: 'pending',
      },
    });
    const notification = await this.prisma.notifikasi.create({
      data: {
        judulPesan: `selamat paket anda ${produk.isipaket} berhasil dikirim ke ${produk.to}`,
        StatusPesan: 'berhasil diupdate',
        keterangan: 'String',
        statusNotiv: 'create',
      },
    });
    if (!notification[0].statusNotiv) {
      throw new HttpException('User not found', 404);
    }
    return produk;
  }
  async UpdatePaket(
    data: StatePaket,
    id: string,
    email: string,
  ): Promise<Paket> {
    const result = await this.validate.validate(UserscemaProduk, data);
    const user = await this.prisma.user.findMany({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const produk = await this.prisma.paket.update({
      where: {
        id: id,
      },
      data: {
        isipaket: result.isipaket,
        from: result.from,
        to: result.to,
        berat: result.berat,
        volume: result.volume,
        jenisPaket: result.jenisPaket,
        nomorPengirim: result.nomorPengirim,
        nomorPenerima: result.nomorPenerima,
        harga: result.harga,
        fotoPaket: result.fotoPaket,
        fotoPenerima: result.fotoPenerima,
      },
    });

    const notification = await this.prisma.notifikasi.updateMany({
      data: {
        judulPesan: `selamat produk anda ${produk.from} berhasil di update`,
        StatusPesan: 'berhasil diupdate',
        keterangan: 'String',
        statusNotiv: 'update',
      },
    });
    if (!notification[0].statusNotiv) {
      throw new HttpException('User not found', 404);
    }

    return produk;
  }
  async DeletePaket(id: string) {
    try {
      const produk = await this.prisma.paket.delete({
        where: {
          id: id,
        },
      });

      return produk;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async FindPaket(id: string) {
    try {
      const produk = await this.prisma.paket.findUnique({
        where: {
          id: id,
        },
      });
      return produk;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
}
