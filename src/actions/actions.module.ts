import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Action} from "./action.model";
import {HistoriesModule} from "../histories/histories.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [ActionsService],
  controllers: [ActionsController],
  imports: [
      SequelizeModule.forFeature([Action]),
    HistoriesModule,
      AuthModule
  ]

})
export class ActionsModule {}
