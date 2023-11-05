import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModelEntity } from './models.model';
import { Size } from 'src/sizes/sizes.model';
import { ModelSize } from 'src/modelsizes/modelsizes.model';
import { Party } from 'src/parties/parties.model';
import { AuthModule } from 'src/auth/auth.module';
import {HistoriesModule} from "../histories/histories.module";

@Module({
  controllers: [ModelsController],
  providers: [ModelsService],
  imports: [
    SequelizeModule.forFeature([ModelEntity, Size, ModelSize, Party]),
    AuthModule,
    HistoriesModule
]
})
export class ModelsModule {}
