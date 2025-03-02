import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
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
  @Post('editTravel')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async editPaymentnTravel(@Body() data: StateTravel, @Query('id') id: string) {
    return this.payment.EditPaymentTravel(data, id);
  }
  @Post('paket')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async paymentPaket(@Body() data: StatePaket) {
    return this.payment.addPaymentPiket(data);
  }

  @Post('editPaket')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async editPaymentPaket(@Body() data: StatePaket, @Query('id') id: string) {
    return this.payment.editPaymentPiket(data, id);
  }
  @Get('findTravel')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindTravel() {
    return this.payment.Travelall();
  }
}
