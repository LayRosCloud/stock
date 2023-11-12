import { Module } from '@nestjs/common';
import { ModeloperationsService } from './modeloperations.service';
import { ModeloperationsController } from './modeloperations.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {ModelEntity} from "../models/models.model";
import {Operation} from "../operations/operations.model";
import {HistoriesModule} from "../histories/histories.module";
import {AuthModule} from "../auth/auth.module";
import {ModelOperation} from "./entities/modeloperation.entity";

@Module({
  controllers: [ModeloperationsController],
  providers: [ModeloperationsService],
  imports: [
      SequelizeModule.forFeature([ModelEntity, Operation, ModelOperation]),
      HistoriesModule,
      AuthModule
  ]
})
export class ModeloperationsModule {}
