import { Module } from '@nestjs/common';
import { TokoController } from './toko/toko.controller';
import { TokoService } from './toko/toko.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TokoController],
  providers: [TokoService],
})
export class TokoModule {}
