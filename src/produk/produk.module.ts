import { Module } from '@nestjs/common';
import { ProdukService } from './produk/produk.service';
import { ProdukController } from './produk/produk.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProdukService],
  controllers: [ProdukController],
})
export class ProdukModule {}
