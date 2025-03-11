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
  async editPaymentnTravel(
    @Query('data') data: string,
    @Query('resi') resi: string,
  ) {
    return this.payment.EditPaymentTravel(data, resi);
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
  async editPaymentPaket(
    @Query('data') data: string,
    @Query('resi') resi: string,
  ) {
    return this.payment.editPaymentPiket(data, resi);
  }
  @Get('findTravel')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindTravel() {
    return this.payment.Travelall();
  }
  @Get('findPaket')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindPaket() {
    return this.payment.Paketall();
  }
  @Get('findResiTravel')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindTravelResi(@Query('resi') resi: string) {
    return this.payment.TravelFind(resi);
  }
  @Get('findResiPaket')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindPaketResi(@Query('resi') resi: string) {
    return this.payment.PaketFind(resi);
  }
}
