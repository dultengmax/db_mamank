import { Test, TestingModule } from '@nestjs/testing';
import { TakurController } from './takur.controller';

describe('TakurController', () => {
  let controller: TakurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TakurController],
    }).compile();

    controller = module.get<TakurController>(TakurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
