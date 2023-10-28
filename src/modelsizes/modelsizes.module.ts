import { Module } from '@nestjs/common';
import { ModelsizesService } from './modelsizes.service';
import { ModelsizesController } from './modelsizes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModelSize } from './modelsizes.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ModelsizesService],
  controllers: [ModelsizesController],
  imports: [
    SequelizeModule.forFeature([ModelSize]),
    AuthModule
]
})
export class ModelsizesModule {}
