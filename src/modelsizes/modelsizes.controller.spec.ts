import { Test, TestingModule } from '@nestjs/testing';
import { ModelsizesController } from './modelsizes.controller';

describe('ModelsizesController', () => {
  let controller: ModelsizesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelsizesController],
    }).compile();

    controller = module.get<ModelsizesController>(ModelsizesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
