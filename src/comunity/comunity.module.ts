import { Module } from '@nestjs/common';
import { ComunityService } from './src/src.service';
import { ComunityController } from './src/src.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ComunityService],
  controllers: [ComunityController],
})
export class ComunityModule {}
