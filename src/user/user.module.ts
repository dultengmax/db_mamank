/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { Connection, createConnection } from './connection/connection.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [PrismaModule,
        JwtModule.register({
          global: true,
          secret: process.env.password,
          signOptions: { expiresIn: '60s' },
        }),
        PassportModule
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },
    UsersService,
  ],
})
export class UserModule {}
