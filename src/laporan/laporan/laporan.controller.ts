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
import { ValidationFilter } from 'src/validation/validation/validation.filter';
import { LaporanService } from './laporan.service';
import { StateLaporan } from './laporan.model';

@Controller('api/laporan')
export class LaporanController {
  constructor(private ulasan: LaporanService) {}

  // ini contoh method yang mengembalikan semua data user
  @Post('add')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async addLaporan(
    @Body() Req: StateLaporan,
    @Query('id') id: string,
  ): Promise<StateLaporan> {
    return this.ulasan.addLaporan(Req, id);
  }
  @Post('edit')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async EditStore(
    @Body() Req: StateLaporan,
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<StateLaporan> {
    return this.ulasan.editLaporan(Req, id);
  }

  @Get('find')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async Findulasan(@Query('id') id: string): Promise<StateLaporan[]> {
    return this.ulasan.findLaporan(id);
  }
}
