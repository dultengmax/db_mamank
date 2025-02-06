import { Injectable } from '@nestjs/common';
import { Snap } from 'midtrans-client';
import { StatePayment } from './payment.model';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class PaymentService {
  private snap: Snap;
  private prisma: PrismaService;

  constructor() {
    this.snap = new Snap({
      isProduction: false, // Set true untuk mode production
      serverKey: 'SB-Mid-server-lVyqZj-3S-PvV9a0_nKggFES', // Ganti dengan server key Anda
    });
  }

  async addPayment(data: StatePayment, userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: userId,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const parameter = {
        transaction_details: {
          order_id: data.order_id,
          gross_amount: data.gross_amount,
        },
        item_details: [
          {
            id: data.item_id,
            price: data.price,
            quantity: data.quantity,
            name: data.nameProduk,
            brand: data.toko,
            category: data.catProduk,
            merchant_name: data.catProduk,
            url: data.url,
          },
        ],
        customer_details: {
          first_name: user.name,
          email: user.email,
          phone: user.contact,
          billing_address: {
            first_name: user.name,
            email: user.email,
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
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }
}
