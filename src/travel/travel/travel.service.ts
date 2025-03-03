import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation/validation.service';
import { SchemaTestimony } from './travel.validation';
import { Testimony } from '@prisma/client';

@Injectable()
export class TravelService {
  constructor(
    private prisma: PrismaService,
    private validate: ValidationService,
  ) {}

  async CreateTestimony(data: Testimony): Promise<Testimony> {
    const result = await this.validate.validate(SchemaTestimony, data);

    const testimony = await this.prisma.testimony.create({
      data: {
        name: result.name,
        pengalaman: result.pengalaman,
        star: result.star,
      },
    });

    return testimony;
  }
  async UpdateTestimony(data: Testimony, id: string): Promise<Testimony> {
    const result = await this.validate.validate(SchemaTestimony, data);

    const testimony = await this.prisma.testimony.update({
      where: {
        id: id,
      },
      data: {
        name: result.name,
        pengalaman: result.pengalaman,
        star: result.star,
      },
    });

    return testimony;
  }
  async DeleteTestimony(id: string) {
    const testimony = await this.prisma.testimony.delete({
      where: {
        id: id,
      },
    });

    return testimony;
  }
  async FindTestimonyAll() {
    const testimony = await this.prisma.testimony.findMany({});

    return testimony;
  }
}
