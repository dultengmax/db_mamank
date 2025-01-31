import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ValidationFilter implements ExceptionFilter<ZodError> {
  catch(exception: ZodError, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const res = http.getResponse<Response>();
    res.status(400).json({
      code: 400,
      errors: exception.errors,
    });
  }
}
