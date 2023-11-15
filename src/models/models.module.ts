import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModelEntity } from './models.model';
import { Size } from 'src/sizes/sizes.model';
import { Party } from 'src/parties/parties.model';
import { AuthModule } from 'src/auth/auth.module';
import {HistoriesModule} from "../histories/histories.module";
import {Price} from "../prices/prices.model";

@Module({
  controllers: [ModelsController],
  providers: [ModelsService],
  imports: [
    SequelizeModule.forFeature([ModelEntity, Size, Party, Price]),
    AuthModule,
    HistoriesModule
]
})
export class ModelsModule {}
