import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from 'winston';
import { Request, Response } from 'express';
@Injectable()
export class LogMiddleware implements NestMiddleware<Request, Response> {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}
  use(req: Request, res: any, next: () => void) {
    this.logger.info(
      `ini contoh tampilan midelware:${req.headers['authorization']} `,
    );

    next();
  }
}
