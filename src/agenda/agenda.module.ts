import { Module } from '@nestjs/common';
import { AgendaService } from './agenda/agenda.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AgendaController } from './agenda/agenda.controller';

@Module({
  imports: [PrismaModule],
  providers: [AgendaService],
  controllers: [AgendaController],
})
export class AgendaModule {}
