import { Module } from '@nestjs/common';
import { SizesController } from './sizes.controller';
import { SizesService } from './sizes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Size } from './sizes.model';
import { Age } from 'src/ages/ages.model';
import { ModelSize } from 'src/modelsizes/modelsizes.model';
import { ModelEntity } from 'src/models/models.model';

@Module({
  controllers: [SizesController],
  providers: [SizesService],
  imports: [
    SequelizeModule.forFeature([Size, Age, ModelSize, ModelEntity])
  ]
})
export class SizesModule {}
