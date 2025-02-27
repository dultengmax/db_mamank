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

import { ProdukModule } from './produk/produk.module';
import { NotificationModule } from './notification/notification.module';
import { PaymentModule } from './payment/payment.module';
import { ProdukService } from './produk/produk/produk.service';

import { CacheModule } from '@nestjs/cache-manager';
import { TravelModule } from './travel/travel.module';
import { PaymentService } from './payment/payment/payment.service';
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
    ProdukModule,
    NotificationModule,
    PaymentModule,
    CacheModule.register({
      ttl: 60 * 60, // 1 hour
      max: 100, // maximum number of items in cache
      isGlobal: true,
    }),
    TravelModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UsersService,
    TokoService,
    ProdukService,
    PaymentService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('/api/*');
  }
}
