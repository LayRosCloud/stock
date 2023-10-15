import { Test, TestingModule } from '@nestjs/testing';
import { ClothoperationsController } from './clothoperations.controller';

describe('ClothoperationsController', () => {
  let controller: ClothoperationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClothoperationsController],
    }).compile();

    controller = module.get<ClothoperationsController>(ClothoperationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
