import {forwardRef, Module} from '@nestjs/common';
import { HistoriesController } from './histories.controller';
import { HistoriesService } from './histories.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {History} from "./histories.model";
import {Action} from "../actions/action.model";
import {Person} from "../persons/persons.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [HistoriesController],
  providers: [HistoriesService],
  imports: [
      SequelizeModule.forFeature([History, Action, Person]),
      forwardRef(()=>AuthModule)
  ],
    exports: [HistoriesService]
})
export class HistoriesModule {}
