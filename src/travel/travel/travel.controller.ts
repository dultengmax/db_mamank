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
import { Testimony } from '@prisma/client';
import { TravelService } from './travel.service';

@Controller('testimony')
export class TravelController {
  constructor(private tes: TravelService) {}

  @Post('Create')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async Createtestimony(@Body() Req: Testimony): Promise<Testimony> {
    return this.tes.CreateTestimony(Req);
  }
  @Post('Update')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async updatetestimony(
    @Body() Req: Testimony,
    @Query('id') id: string,
  ): Promise<Testimony> {
    return this.tes.UpdateTestimony(Req, id);
  }
  @Post('delete')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async deletetestimony(@Query('id') id: string): Promise<Testimony> {
    return this.tes.DeleteTestimony(id);
  }
  @Get('All')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async FindTestimonyAll(): Promise<Testimony[]> {
    return this.tes.FindTestimonyAll();
  }
}
