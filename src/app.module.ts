import { UsersService } from './user/users/users.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { WinstonModule } from 'nest-winston';
import { ValidationModule } from './validation/validation.module';
import * as winston from 'winston';
import { LogMiddleware } from './log/log.middleware';
import { TokoModule } from './toko/toko.module';
import { TokoService } from './toko/toko/toko.service';
import { LowonganModule } from './lowongan/lowongan.module';
import { LowonganService } from './lowongan/lowongan/lowongan.service';
import { AgendaModule } from './agenda/agenda.module';
import { AgendaService } from './agenda/agenda/agenda.service';
import { ProdukModule } from './produk/produk.module';
import { NotificationModule } from './notification/notification.module';
import { LaporanModule } from './laporan/laporan.module';
import { PaymentModule } from './payment/payment.module';
import { ProdukService } from './produk/produk/produk.service';
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      level: 'debug',
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    }),
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ValidationModule.forRoot(true),
    TokoModule,
    LowonganModule,
    AgendaModule,
    ProdukModule,
    NotificationModule,
    LaporanModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UsersService,
    TokoService,
    LowonganService,
    AgendaService,
    ProdukService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('/api/*');
  }
}
