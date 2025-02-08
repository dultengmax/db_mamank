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
import { TakurService } from './takur.service';
import { ValidationFilter } from 'src/validation/validation/validation.filter';
import { StateTakur } from './takur.model';
import { CacheInterceptor } from '@nestjs/cache-manager';
@Controller('api/takur')
export class TakurController {
  constructor(private Takur: TakurService) {}

  @Post('add')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async addTakur(
    @Body() Req: StateTakur,
    @Query('email') email: string,
  ): Promise<StateTakur> {
    return this.Takur.CreateTakur(Req, email);
  }
  @Post('update')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async editTakur(
    @Body() Req: StateTakur,
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<StateTakur> {
    return this.Takur.UpdateTakur(Req, email, id);
  }
  @Get('find')
  @HttpCode(200)
  @UseInterceptors(CacheInterceptor)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async findTakur(
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<StateTakur[]> {
    return this.Takur.findTakur(email, id);
  }
}
