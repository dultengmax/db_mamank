/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerServises = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(loggerServises)
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false,maxAge: 10000},
      rolling: true,
    }),
  );
  await app.listen(3000,'0.0.0.0');
}
bootstrap();
