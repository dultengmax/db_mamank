import { Module } from '@nestjs/common';
import { UlasanController } from './ulasan/ulasan.controller';
import { UlasanService } from './ulasan/ulasan.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UlasanController],
  providers: [UlasanService],
})
export class UlasanModule {}
