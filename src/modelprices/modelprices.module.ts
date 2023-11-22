import { Module } from '@nestjs/common';
import { ModelpricesService } from './modelprices.service';
import { ModelpricesController } from './modelprices.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {ModelPrice} from "./modelprices.model";
import {Price} from "../prices/prices.model";
import {ModelEntity} from "../models/models.model";
import {AuthModule} from "../auth/auth.module";
import {HistoriesModule} from "../histories/histories.module";

@Module({
  providers: [ModelpricesService],
  controllers: [ModelpricesController],
  imports: [
      SequelizeModule.forFeature([ModelPrice, Price, ModelEntity]),
      AuthModule,
      HistoriesModule
  ]
})
export class ModelpricesModule {}
