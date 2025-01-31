import { Injectable } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationService {
  validate<T>(schema: ZodType<T>, data: T): T {
    const validatedData = schema.parse(data);
    return validatedData;
  }
}
