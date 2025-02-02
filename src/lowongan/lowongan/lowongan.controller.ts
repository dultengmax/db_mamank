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
import { LowonganService } from './lowongan.service';
import { ValidationFilter } from 'src/validation/validation/validation.filter';
import { stateLowongan } from './lowongan.model';

@Controller('api/lowongan')
export class LowonganController {
  constructor(private lowongan: LowonganService) {}

  // ini contoh method yang mengembalikan semua data user
  @Post('createlowongan')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async CreateStore(
    @Body() Req: stateLowongan,
    @Query('email') email: string,
  ): Promise<stateLowongan> {
    return this.lowongan.CreateLowongan(Req, email);
  }
  @Post('editlowongan')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async EditStore(
    @Body() Req: stateLowongan,
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<stateLowongan> {
    return this.lowongan.UpdateLowongan(Req, email, id);
  }

  @Post('deletelowongan')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async deleteLowongan(
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<stateLowongan> {
    return this.lowongan.DeleteLowongan(email, id);
  }

  @Get('findlowongan/:id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async Findlowongan(
    @Query('skip') skip: number,
    @Query('limits') limits: number,
  ): Promise<stateLowongan[]> {
    return this.lowongan.Findlowongan(skip, limits);
  }
  @Get('findlowongan/:id')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async Findlowonganbyid(@Query('id') id: string): Promise<stateLowongan[]> {
    return this.lowongan.Findlowonganbyid(id);
  }

  @Get('lowonganAll')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async Findlowonganbtcat(
    @Query('skip') skip: number,
    @Query('limits') limits: number,
    @Query('cat') cat: string,
  ): Promise<stateLowongan[]> {
    return this.lowongan.FindlowonganbyKategories(skip, limits, cat);
  }
}
