import { Module } from '@nestjs/common';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Color} from "./colors.model";
import {AuthModule} from "../auth/auth.module";
import {HistoriesModule} from "../histories/histories.module";

@Module({
  controllers: [ColorsController],
  providers: [ColorsService],
  imports: [
      SequelizeModule.forFeature([Color]),
      AuthModule,
      HistoriesModule
  ]
})
export class ColorsModule {}
