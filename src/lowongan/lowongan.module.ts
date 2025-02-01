import { Module } from '@nestjs/common';
import { LowonganController } from './lowongan/lowongan.controller';
import { LowonganService } from './lowongan/lowongan.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LowonganController],
  providers: [LowonganService],
})
export class LowonganModule {}
