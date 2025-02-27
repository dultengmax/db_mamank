import { Injectable } from '@nestjs/common';
import { Snap } from 'midtrans-client';
import { StatePaket, StateTravel } from './payment.model';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { UserscemaProduk } from 'src/produk/produk/produk.validation';
import { ValidationService } from 'src/validation/validation/validation.service';

@Injectable()
export class PaymentService {
  private snap: Snap;
  private prisma: PrismaService;
  private validate: ValidationService;
  constructor() {
    this.snap = new Snap({
      isProduction: false, // Set true untuk mode production
      serverKey: 'SB-Mid-server-lVyqZj-3S-PvV9a0_nKggFES', // Ganti dengan server key Anda
    });
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
