import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { StatePaket, StateTravel } from './payment.model';

@Controller('payment')
export class PaymentController {
  constructor(private payment: PaymentService) {}
  @Post('travel')
  async PaymetnTravel(@Body() data: StateTravel) {
    return this.payment.addPaymentTravel(data);
  }
  @Post('paket')
  async paymentPaket(@Body() data: StatePaket) {
    return this.payment.addPaymentPiket(data);
  }
}
