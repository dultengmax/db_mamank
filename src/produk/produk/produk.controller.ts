import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ValidationFilter } from 'src/validation/validation/validation.filter';
import { ProdukService } from './produk.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Paket } from '@prisma/client';
import { StatePaket } from './produk.model';

@Controller('paket')
export class ProdukController {
  constructor(private produk: ProdukService) {}

  // ini contoh method yang mengembalikan semua data user
  @Post('createproduk')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async CreatePaket(
    @Body() Req: StatePaket,
    @Query('email') email: string,
  ): Promise<Paket> {
    return this.produk.CreatePaket(Req, email);
  }
  @Post('editPaket')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async EditStore(
    @Body() Req: StatePaket,
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<Paket> {
    return this.produk.UpdatePaket(Req, email, id);
  }

  @Post('delelePaket')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async deleteproduk(
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<Paket> {
    return this.produk.DeletePaket(id);
  }

  @Get('findpaket/:id')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async Findprodukbyid(@Query('id') id: string): Promise<any> {
    return this.produk.FindPaket(id);
  }
}
