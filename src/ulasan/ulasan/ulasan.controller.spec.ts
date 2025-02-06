import { Test, TestingModule } from '@nestjs/testing';
import { UlasanController } from './ulasan.controller';

describe('UlasanController', () => {
  let controller: UlasanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UlasanController],
    }).compile();

    controller = module.get<UlasanController>(UlasanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
