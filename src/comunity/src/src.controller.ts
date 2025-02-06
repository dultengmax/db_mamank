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
import { ComunityService } from './src.service';
import { stateComunity } from './src.model';
@Controller('api/komunitas')
export class ComunityController {
  constructor(private comunity: ComunityService) {}

  @Post('add')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async addComunity(
    @Body() Req: stateComunity,
    @Query('id') id: string,
  ): Promise<stateComunity> {
    return this.comunity.addComunity(Req, id);
  }
  @Post('edit')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async EditComunity(
    @Body() Req: stateComunity,
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<stateComunity> {
    return this.comunity.EditComunity(Req, email, id);
  }
  @Post('delete')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async deleteComunity(@Query('id') id: string): Promise<stateComunity> {
    return this.comunity.deleteComunity(id);
  }

  @Get('find')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async findComunity() {
    return this.comunity.findComunity();
  }
  @Get('findby')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async findComunitybyid(@Query('id') id: string) {
    return this.comunity.findComunityById(id);
  }
  @Get('search')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async findComunitybyName(@Query('name') name: string) {
    return this.comunity.findComunitybyName(name);
  }
}
