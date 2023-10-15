import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModelEntity } from './models.model';
import { Size } from 'src/sizes/sizes.model';
import { ModelSize } from 'src/modelsizes/modelsizes.model';
import { Party } from 'src/parties/parties.model';

@Module({
  controllers: [ModelsController],
  providers: [ModelsService],
  imports: [
    SequelizeModule.forFeature([ModelEntity, Size, ModelSize, Party])
]
})
export class ModelsModule {}