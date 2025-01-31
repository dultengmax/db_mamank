import {
  Body,
  Controller,
  Header,
  HttpCode,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { LowonganService } from './lowongan.service';
import { ValidationFilter } from 'src/validation/validation/validation.filter';
import { stateToko } from './lowongan.model';

@Controller('toko')
export class LowonganController {
  constructor(private toko: LowonganService) {}

  // ini contoh method yang mengembalikan semua data user
  @Post('CreateToko')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async CreateStore(
    @Body() Req: stateToko,
    @Query('email') email: string,
  ): Promise<stateToko> {
    return this.toko.CreateToko(Req, email);
  }
  @Post('editToko')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async EditStore(
    @Body() Req: stateToko,
    @Query('email') email: string,
  ): Promise<stateToko> {
    return this.toko.CreateToko(Req, email);
  }
}
