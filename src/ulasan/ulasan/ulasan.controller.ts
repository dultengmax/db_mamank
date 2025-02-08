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
import { UlasanService } from './ulasan.service';
import { StateUlasan } from './ulasan.model';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('ulasan')
export class UlasanController {
  constructor(private ulasan: UlasanService) {}

  // ini contoh method yang mengembalikan semua data user
  @Post('CreateUlasan')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async CreateUlasan(
    @Body() Req: StateUlasan,
    @Query('id') id: string,
    @Query('email') email: string,
  ): Promise<StateUlasan> {
    return this.ulasan.AddUlasan(Req, id, email);
  }
  @Post('editulasan')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async EditStore(
    @Body() Req: StateUlasan,
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<StateUlasan> {
    return this.ulasan.updateUlasan(Req, id, email);
  }
  @Post('deleteulasan')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async delete(@Query('id') id: string): Promise<StateUlasan> {
    return this.ulasan.deleteUlasan(id);
  }

  @Get('findulasan')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async Findulasan(@Query('id') id: string): Promise<StateUlasan[]> {
    return this.ulasan.ulasanbyProduk(id);
  }
}
