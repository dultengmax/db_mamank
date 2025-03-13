import { Injectable } from '@nestjs/common';
import { Snap } from 'midtrans-client';
import { StatePaket, StateTravel } from './payment.model';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import {
  UserscemaProduk,
  UserscemaTravel,
} from 'src/produk/produk/produk.validation';
import { ValidationService } from 'src/validation/validation/validation.service';

@Injectable()
export class PaymentService {
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
  async addPaymentTravel(data: StateTravel) {
    const result = await this.validate.validate(UserscemaTravel, data);
    try {
      const findUser = await this.prisma.user.count({
        where: {
          userName: result.namaPenumpang,
        },
      });
      if (findUser === 0) {
        const user = await this.prisma.user.create({
          data: {
            userName: result.namaPenumpang,
            contact: result.nomorPengirim,
            address: result.mapfrom,
            kota: result.cityf,
          },
        });
        const toko = await this.prisma.travel.create({
          data: {
            from: result.from,
            to: result.to,
            mapfrom: result.mapfrom,
            mapto: result.mapto,
            image: result.image,
            status: result.status,
            namaPenumpang: result.namaPenumpang,
            jenisTravel: result.jenisTravel,
            nomorPengirim: result.nomorPengirim,
            harga: result.harga,
            cityf: result.cityf,
            cityt: result.cityt,
            jadwal: result.jadwal,
            pay: result.pay,
            jam: data.jam,
            resi: result.resi,
            AuthorId: result.nomorPengirim,
          },
        });
        const parameter = {
          transaction_details: {
            order_id: toko.id,
            gross_amount: parseInt(toko.harga),
          },
          item_details: [
            {
              id: 1122,
              price: parseInt(toko.harga),
              quantity: 1,
              name: toko.jenisTravel,
              brand: 'mamank travel',
              category: toko.jenisTravel,
              merchant_name: 'mamank travel',
              url: 'http://www.mamanktravel.id',
            },
          ],
          customer_details: {
            first_name: user.userName,
            phone: parseInt(user.contact),
            billing_address: {
              first_name: user.userName,
              phone: parseInt(user.contact),
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
      const toko = await this.prisma.travel.create({
        data: {
          from: result.from,
          to: result.to,
          mapfrom: result.mapfrom,
          mapto: result.mapto,
          image: result.image,
          status: result.status,
          namaPenumpang: result.namaPenumpang,
          jenisTravel: result.jenisTravel,
          nomorPengirim: result.nomorPengirim,
          harga: result.harga,
          cityf: result.cityf,
          cityt: result.cityt,
          jadwal: result.jadwal,
          pay: result.pay,
          jam: data.jam,
          resi: result.resi,
          AuthorId: result.nomorPengirim,
        },
      });

      const parameter = {
        transaction_details: {
          order_id: toko.id,
          gross_amount: parseInt(toko.harga),
        },
        item_details: [
          {
            id: 1122,
            price: parseInt(toko.harga),
            quantity: 1,
            name: toko.jenisTravel,
            brand: 'mamank travel',
            category: toko.jenisTravel,
            merchant_name: 'mamank travel',
            url: 'http://www.mamanktravel.id',
          },
        ],
        customer_details: {
          first_name: result.namaPenumpang,
          phone: parseInt(result.nomorPengirim),
          billing_address: {
            first_name: result.namaPenumpang,
            phone: parseInt(result.nomorPengirim),
            address: result.cityt,
            city: result.cityf,
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
  async EditPaymentTravel(data: string, resi: string) {
    try {
      const toko = await this.prisma.travel.update({
        where: {
          resi: resi,
        },
        data: {
          status: data,
        },
      });

      return toko;
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }
  async deletePaymentTravel(resi: string) {
    try {
      const toko = await this.prisma.travel.delete({
        where: {
          resi: resi,
        },
      });

      return toko;
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }
  async addPaymentPiket(data: StatePaket) {
    const result = await this.validate.validate(UserscemaProduk, data);

    try {
      const findUser = await this.prisma.user.count({
        where: {
          userName: result.namaPengirim,
        },
      });

      if (findUser === 0) {
        const user = await this.prisma.user.create({
          data: {
            userName: result.namaPengirim,
            contact: result.nomorPengirim,
            address: result.from,
            kota: result.cityf,
          },
        });

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
            cityf: data.cityf,
            cityt: data.cityt,
            jadwal: data.jadwal,
            pay: data.pay,
            jam: data.jam,
            resi: result.resi,
            namaPenerima: result.namaPenerima,
            namaPengirim: result.namaPengirim,
          },
        });

        const parameter = {
          transaction_details: {
            order_id: toko.id,
            gross_amount: parseInt(toko.harga),
          },
          item_details: [
            {
              id: 1123,
              price: parseInt(toko.harga),
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
            phone: parseInt(user.contact),
            billing_address: {
              first_name: user.userName,
              phone: parseInt(user.contact),
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
          cityf: data.cityf,
          cityt: data.cityt,
          jadwal: data.jadwal,
          pay: data.pay,
          jam: data.jam,
          resi: result.resi,
          namaPenerima: result.namaPenerima,
          namaPengirim: result.namaPengirim,
        },
      });

      const parameter = {
        transaction_details: {
          order_id: toko.id,
          gross_amount: parseInt(toko.harga),
        },
        item_details: [
          {
            id: 1123,
            price: parseInt(toko.harga),
            quantity: 1,
            name: toko.isipaket,
            brand: 'mamank travel',
            category: toko.isipaket,
            merchant_name: 'mamank travel',
            url: 'http://www.mamanktravel.id',
          },
        ],
        customer_details: {
          first_name: result.namaPengirim,
          phone: parseInt(result.nomorPengirim),
          billing_address: {
            first_name: result.namaPengirim,
            phone: parseInt(result.nomorPengirim),
            address: result.cityf,
            city: result.cityf,
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
  async editPaymentPiket(data: string, resi: string) {
    try {
      const toko = await this.prisma.paket.update({
        where: { resi: resi },
        data: {
          jenisPaket: data,
        },
      });
      return toko;
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }
  async deletePaymentPiket(resi: string) {
    try {
      const toko = await this.prisma.paket.delete({
        where: { resi: resi },
      });
      return toko;
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }
  async Travelall() {
    const travels = await this.prisma.travel.findMany({});
    return travels;
  }
  async Paketall() {
    const travels = await this.prisma.paket.findMany({});
    return travels;
  }
  async TravelFind(resi: string) {
    const travels = await this.prisma.travel.findMany({
      where: { resi: resi },
    });
    return travels;
  }
  async PaketFind(resi: string) {
    const travels = await this.prisma.paket.findMany({
      where: { resi: resi },
    });
    return travels;
  }
}
