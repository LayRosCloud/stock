import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Material} from "./materials.model";
import {AuthModule} from "../auth/auth.module";
import {HistoriesModule} from "../histories/histories.module";

@Module({
  providers: [MaterialsService],
  controllers: [MaterialsController],
  imports: [
      SequelizeModule.forFeature([Material]),
      AuthModule,
      HistoriesModule
  ]
})
export class MaterialsModule {}
