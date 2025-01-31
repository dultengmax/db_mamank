import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from './connection.service';

describe('ConnectionService', () => {
  let service: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Connection],
    }).compile();

    service = module.get<Connection>(Connection);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
