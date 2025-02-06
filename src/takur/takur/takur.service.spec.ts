import { Test, TestingModule } from '@nestjs/testing';
import { TakurService } from './takur.service';

describe('TakurService', () => {
  let service: TakurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TakurService],
    }).compile();

    service = module.get<TakurService>(TakurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
