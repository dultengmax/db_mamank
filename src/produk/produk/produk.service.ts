import { Injectable, HttpException } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UserscemaProduk } from './produk.validation';
import { StateProduk } from './produk.model';
import { Produk } from '@prisma/client';

@Injectable()
export class ProdukService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}

  async CreateProduk(data: StateProduk, id: string): Promise<Produk> {
    const result = await this.validate.validate(UserscemaProduk, data);
    const toko = await this.prisma.toko.findMany({
      where: {
        AuthorId: id,
      },
    });
    if (!toko) {
      throw new HttpException('User not found', 404);
    }
    const produk = await this.prisma.produk.create({
      data: {
        namaProduk: result.namaProduk,
        detailProduk: result.detailProduk,
        catProduk: result.catProduk,
        hargaProduk: result.HargaProduk,
        JenisProduk: result.jenisProduk,
        berat: result.berat,
        volume: result.volume,
        fotoProduk: result.fotoProduk,
        diskon: result.diskon,
        Lokasi: result.Lokasi,
        variantProduk: result.VariantProduk,
        video: result.video,
        hargavariant: result.hargavariant,
        PesananId: result.pesananId,
      },
    });
    const notification = await this.prisma.notifikasi.create({
      data: {
        judulPesan: `selamat produk anda ${produk.namaProduk} berhasil dibuat`,
        StatusPesan: 'berhasil diupdate',
        keterangan: 'String',
        statusNotiv: 'create',
        NotivTokoId: id,
      },
    });
    if (!notification[0].statusNotiv) {
      throw new HttpException('User not found', 404);
    }
    return produk;
  }
  async UpdateProduk(
    data: StateProduk,
    id: string,
    email: string,
  ): Promise<Produk> {
    const result = await this.validate.validate(UserscemaProduk, data);
    const toko = await this.prisma.toko.findMany({
      where: {
        AuthorId: email,
      },
    });
    if (!toko) {
      throw new HttpException('User not found', 404);
    }
    const produk = await this.prisma.produk.update({
      where: {
        id: id,
      },
      data: {
        namaProduk: result.namaProduk,
        detailProduk: result.detailProduk,
        catProduk: result.catProduk,
        hargaProduk: result.HargaProduk,
        JenisProduk: result.jenisProduk,
        berat: result.berat,
        volume: result.volume,
        fotoProduk: result.fotoProduk,
        diskon: result.diskon,
        Lokasi: result.Lokasi,
        variantProduk: result.VariantProduk,
        video: result.video,
        hargavariant: result.hargavariant,
        PesananId: result.pesananId,
      },
    });

    const notification = await this.prisma.notifikasi.updateMany({
      where: {
        NotivTokoId: id,
      },
      data: {
        judulPesan: `selamat produk anda ${produk.namaProduk} berhasil di update`,
        StatusPesan: 'berhasil diupdate',
        keterangan: 'String',
        statusNotiv: 'update',
        NotivTokoId: id,
      },
    });
    if (!notification[0].statusNotiv) {
      throw new HttpException('User not found', 404);
    }

    return produk;
  }
  async DeleteProduk(id: string) {
    try {
      const produk = await this.prisma.produk.delete({
        where: {
          id: id,
        },
      });

      const notification = await this.prisma.notifikasi.updateMany({
        where: {
          NotivTokoId: id,
        },
        data: {
          judulPesan: `selamat produk anda ${produk.namaProduk} berhasil di hapus`,
          StatusPesan: 'berhasil dihapus',
          keterangan: 'String',
          statusNotiv: 'delete',
          NotivTokoId: id,
        },
      });
      if (!notification[0].statusNotiv) {
        throw new HttpException('User not found', 404);
      }
      return produk;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async Findproduk(id: string) {
    try {
      const produk = await this.prisma.produk.findUnique({
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
  async FindprodukMany(skip: string, limits: string, harga: string) {
    try {
      const produk = await this.prisma.produk.findMany({
        where: {
          hargaProduk: harga,
        },
        skip: parseInt(skip),
        take: parseInt(limits),
      });
      return produk;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async FindprodukbyCat(cat: string, skip: string, limits: string) {
    try {
      const produk = await this.prisma.produk.findMany({
        where: {
          JenisProduk: cat,
        },
        skip: parseInt(skip),
        take: parseInt(limits),
      });
      return produk;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async SearchProduk(name: string, skip: string, limits: string) {
    try {
      const produk = await this.prisma.produk.findMany({
        where: {
          namaProduk: name,
        },
        skip: parseInt(skip),
        take: parseInt(limits),
        orderBy: {
          CreateDateAt: 'desc',
        },
      });

      return produk;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
}
