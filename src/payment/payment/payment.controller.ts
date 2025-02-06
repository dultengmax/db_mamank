import { Body, Controller, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { StatePayment } from './payment.model';

@Controller('payment')
export class PaymentController {
  constructor(private payment: PaymentService) {}
  @Post('add')
  async CreateStore(
    @Body() data: StatePayment,
    @Query('userId') userId: string,
  ) {
    return this.payment.addPayment(data, userId);
  }
}
