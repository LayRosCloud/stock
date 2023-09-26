import { Module } from '@nestjs/common';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Cutter} from "../cutter/cutter.model";
import {Models} from "./model.model";
import {Size} from "../size/size.model";

@Module({
  controllers: [ModelController],
  providers: [ModelService],
  imports: [
      SequelizeModule.forFeature([Cutter, Size, Models])
  ]
})
export class ModelModule {}
