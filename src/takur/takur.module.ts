import { Module } from '@nestjs/common';
import { TakurService } from './takur/takur.service';
import { TakurController } from './takur/takur.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TakurService],
  controllers: [TakurController],
})
export class TakurModule {}
