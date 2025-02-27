import { Injectable, HttpException } from '@nestjs/common';
import { ValidationService } from 'src/validation/validation/validation.service';
import { stateToko } from './toko.model';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { Rute } from '@prisma/client';
import { UserSchemaRute } from './toko.validation';
import { StatePaket, StateTravel } from 'src/payment/payment/payment.model';
import { Snap } from 'midtrans-client';
import { UserscemaProduk } from 'src/produk/produk/produk.validation';

@Injectable()
export class TokoService {
  private snap: Snap;
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {
    this.snap = new Snap({
      isProduction: false, // Set true untuk mode production
      serverKey: 'SB-Mid-server-lVyqZj-3S-PvV9a0_nKggFES', // Ganti dengan server key Anda
    });
  }

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
        harga: result.harga,
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
        harga: result.harga,
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

  async addImageRute(data: string, id: string) {
    try {
      const toko = await this.prisma.rute.update({
        where: {
          id: id,
        },
        data: {
          image: data,
        },
      });
      return toko;
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', 404);
    }
  }
  async addImageCarousel(data: string) {
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
  async DeleteImagCarousel(data: string, id: string) {
    try {
      const toko = await this.prisma.carousel.update({
        where: {
          id: id,
        },
        data: {
          carousel: null,
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
  async addPaymentTravel(data: StateTravel) {
    try {
      const toko = await this.prisma.travel.create({
        data: {
          from: data.from,
          to: data.to,
          mapfrom: data.mapfrom,
          mapto: data.mapto,
          image: data.image,
          status: data.status,
          namaPenumpang: data.namaPenumpang,
          jenisTravel: data.jenisTraveller,
          nomorPengirim: data.nomorPengirim,
          harga: data.harga,
          cityf: data.cityf,
          cityt: data.cityt,
          jadwal: data.jadwal,
          pay: data.pay,
          jam: data.jam,
        },
      });

      const findUser = await this.prisma.user.findUnique({
        where: { userName: toko.namaPenumpang },
      });

      if (!findUser) {
        const user = await this.prisma.user.create({
          data: {
            userName: toko.namaPenumpang,
            contact: toko.nomorPengirim,
            address: toko.mapfrom,
            kota: toko.cityf,
          },
        });

        const parameter = {
          transaction_details: {
            order_id: toko.id,
            gross_amount: toko.harga,
          },
          item_details: [
            {
              id: toko.id,
              price: toko.harga,
              quantity: 1,
              name: toko.jenisTravel,
              brand: 'mamank travel',
              category: toko.jenisTravel,
              merchant_name: 'mamank travel',
              url: 'http://www.mamanktravel.id',
            },
          ],
          customer_details: {
            first_name: user.name,
            phone: user.contact,
            billing_address: {
              first_name: user.name,
              phone: user.contact,
              address: user.address,
              city: user.kota,
              country_code: 'IDN',
            },
          },
        };

        const transaction = await this.snap.createTransaction(parameter);
        if (transaction.status === 200) {
        }
        return {
          token: transaction.token,
          redirect_url: transaction.redirect_url,
        };
      }
      const parameter = {
        transaction_details: {
          order_id: toko.id,
          gross_amount: toko.harga,
        },
        item_details: [
          {
            id: toko.id,
            price: toko.harga,
            quantity: 1,
            name: toko.jenisTravel,
            brand: 'mamank travel',
            category: toko.jenisTravel,
            merchant_name: 'mamank travel',
            url: 'http://www.mamanktravel.id',
          },
        ],
        customer_details: {
          first_name: findUser.name,
          phone: findUser.contact,
          billing_address: {
            first_name: findUser.name,
            phone: findUser.contact,
            address: findUser.address,
            city: findUser.kota,
            country_code: 'IDN',
          },
        },
      };

      const transaction = await this.snap.createTransaction(parameter);
      if (transaction.status === 200) {
      }
      return {
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      };
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }

  async addPaymentPiket(data: StatePaket) {
    const result = await this.validate.validate(UserscemaProduk, data);

    try {
      const toko = await this.prisma.paket.create({
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

      const findUser = await this.prisma.user.findUnique({
        where: { userName: toko.namaPengirim },
      });

      if (!findUser) {
        const user = await this.prisma.user.create({
          data: {
            userName: toko.namaPengirim,
            contact: toko.nomorPengirim,
            address: toko.from,
            kota: toko.cityf,
          },
        });

        const parameter = {
          transaction_details: {
            order_id: toko.id,
            gross_amount: toko.harga,
          },
          item_details: [
            {
              id: toko.id,
              price: toko.harga,
              quantity: 1,
              name: toko.isipaket,
              brand: 'mamank travel',
              category: toko.isipaket,
              merchant_name: 'mamank travel',
              url: 'http://www.mamanktravel.id',
            },
          ],
          customer_details: {
            first_name: user.userName,
            phone: user.contact,
            billing_address: {
              first_name: user.userName,
              phone: user.contact,
              address: user.address,
              city: user.kota,
              country_code: 'IDN',
            },
          },
        };

        const transaction = await this.snap.createTransaction(parameter);
        if (transaction.status === 200) {
        }
        return {
          token: transaction.token,
          redirect_url: transaction.redirect_url,
        };
      }

      const parameter = {
        transaction_details: {
          order_id: toko.id,
          gross_amount: toko.harga,
        },
        item_details: [
          {
            id: toko.id,
            price: toko.harga,
            quantity: 1,
            name: toko.isipaket,
            brand: 'mamank travel',
            category: toko.isipaket,
            merchant_name: 'mamank travel',
            url: 'http://www.mamanktravel.id',
          },
        ],
        customer_details: {
          first_name: findUser.userName,
          phone: findUser.contact,
          billing_address: {
            first_name: findUser.userName,
            phone: findUser.contact,
            address: findUser.address,
            city: findUser.kota,
            country_code: 'IDN',
          },
        },
      };

      const transaction = await this.snap.createTransaction(parameter);
      if (transaction.status === 200) {
      }
      return {
        token: transaction.token,
        redirect_url: transaction.redirect_url,
      };
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }
}
