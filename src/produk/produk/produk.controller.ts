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
import { StateProduk } from './produk.model';
import { ProdukService } from './produk.service';
import { Produk } from '@prisma/client';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('produk')
export class ProdukController {
  constructor(private produk: ProdukService) {}

  // ini contoh method yang mengembalikan semua data user
  @Post('createproduk')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async CreateStore(
    @Body() Req: StateProduk,
    @Query('email') email: string,
  ): Promise<Produk> {
    return this.produk.CreateProduk(Req, email);
  }
  @Post('editproduk')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async EditStore(
    @Body() Req: StateProduk,
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<Produk> {
    return this.produk.UpdateProduk(Req, email, id);
  }

  @Post('deleteproduk')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async deleteproduk(
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<Produk> {
    return this.produk.DeleteProduk(id);
  }

  @Get('produkAll')
  @HttpCode(200)
  @UseInterceptors(CacheInterceptor)
  @Header('Content-Type', 'application/json')
  async FindprodukAll(
    @Query('skip') skip: string,
    @Query('limits') limits: string,
    @Query('harga') harga: string,
  ): Promise<any> {
    return this.produk.FindprodukMany(skip, limits, harga);
  }
  @Get('findproduk/:id')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async Findprodukbyid(@Query('id') id: string): Promise<any> {
    return this.produk.Findproduk(id);
  }

  @Get('kategories')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async Findprodukbtcat(
    @Query('cat') cat: string,
    @Query('skip') skip: string,
    @Query('limits') limits: string,
  ): Promise<any> {
    return this.produk.FindprodukbyCat(skip, limits, cat);
  }
  @Get('searchProduk')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async searchProduk(
    @Query('name') name: string,
    @Query('skip') skip: string,
    @Query('limits') limits: string,
  ): Promise<any> {
    return this.produk.SearchProduk(skip, limits, name);
  }
}
