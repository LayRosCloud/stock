import { Test, TestingModule } from '@nestjs/testing';
import { ModelsizesService } from './modelsizes.service';

describe('ModelsizesService', () => {
  let service: ModelsizesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelsizesService],
    }).compile();

    service = module.get<ModelsizesService>(ModelsizesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
