import { Test, TestingModule } from '@nestjs/testing';
import { SrcController } from './src.controller';

describe('SrcController', () => {
  let controller: SrcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrcController],
    }).compile();

    controller = module.get<SrcController>(SrcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
