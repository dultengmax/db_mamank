import { Module } from '@nestjs/common';
import { PaymentService } from './payment/payment.service';
import { PaymentController } from './payment/payment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
