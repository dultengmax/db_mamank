import { Body, Controller, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { StatePaket, StateTravel } from './payment.model';

@Controller('payment')
export class PaymentController {
  constructor(private payment: PaymentService) {}
  @Post('travel')
  async PaymetnTravel(
    @Body() data: StateTravel,
    @Query('userId') userId: string,
  ) {
    return this.payment.addPaymentTravel(data, userId);
  }
  @Post('paket')
  async paymentPaket(
    @Body() data: StatePaket,
    @Query('userId') userId: string,
  ) {
    return this.payment.addPaymentPiket(data, userId);
  }
}
