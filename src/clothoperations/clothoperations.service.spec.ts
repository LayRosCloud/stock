import { Test, TestingModule } from '@nestjs/testing';
import { ClothoperationsService } from './clothoperations.service';

describe('ClothoperationsService', () => {
  let service: ClothoperationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClothoperationsService],
    }).compile();

    service = module.get<ClothoperationsService>(ClothoperationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
