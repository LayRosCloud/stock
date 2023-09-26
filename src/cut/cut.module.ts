import { Module } from '@nestjs/common';
import { CutController } from './cut.controller';
import { CutService } from './cut.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Models} from "../model/model.model";
import {Cutter} from "../cutter/cutter.model";
import {Cut} from "./cut.model";

@Module({
  controllers: [CutController],
  providers: [CutService],
  imports: [
      SequelizeModule.forFeature([Models, Cutter, Cut])
  ]
})
export class CutModule {}
