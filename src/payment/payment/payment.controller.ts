import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  UseFilters,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { StatePaket, StateTravel } from './payment.model';
import { ValidationFilter } from 'src/validation/validation/validation.filter';

@Controller('payment')
export class PaymentController {
  constructor(private payment: PaymentService) {}
  @Post('travel')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async PaymetnTravel(@Body() data: StateTravel) {
    return this.payment.addPaymentTravel(data);
  }
  @Post('paket')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async paymentPaket(@Body() data: StatePaket) {
    return this.payment.addPaymentPiket(data);
  }
  @Get('findTravel')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindTravel() {
    return this.payment.Travelall();
  }
}
