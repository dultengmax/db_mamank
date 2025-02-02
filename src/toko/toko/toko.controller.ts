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
import { TokoService } from './toko.service';
import { ValidationFilter } from 'src/validation/validation/validation.filter';
import { stateToko } from './toko.model';

@Controller('toko')
export class TokoController {
  constructor(private toko: TokoService) {}

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
    @Query('id') id: string,
  ): Promise<stateToko> {
    return this.toko.UpdateToko(Req, email, id);
  }

  @Get('findToko/:id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindToko(@Query('id') id: string): Promise<stateToko> {
    return this.toko.FindToko(id);
  }

  @Get('tokoAll')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async FindTokoAll(): Promise<stateToko[]> {
    return this.toko.FindTokoMany();
  }
}
