import {
  Body,
  Controller,
  Header,
  HttpCode,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ValidationFilter } from 'src/validation/validation/validation.filter';
import { AgendaService } from './agenda.service';
import { stateAgenda } from './lowongan.model';

@Controller('api/agenda')
export class AgendaController {
  constructor(private agenda: AgendaService) {}

  // ini contoh method yang mengembalikan semua data user
  @Post('createagenda')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async CreateStore(
    @Body() Req: stateAgenda,
    @Query('email') email: string,
  ): Promise<stateAgenda> {
    return this.agenda.CreateAgenda(Req, email);
  }
  @Post('editagenda')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async EditStore(
    @Body() Req: stateAgenda,
    @Query('email') email: string,
    @Query('id') id: string,
  ): Promise<stateAgenda> {
    return this.agenda.editAgenda(email, Req, id);
  }

  @Post('deleteagenda')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  @UseFilters(ValidationFilter)
  async deleteLowongan(@Query('id') id: string): Promise<stateAgenda> {
    return this.agenda.deleteAgenda(id);
  }
}
