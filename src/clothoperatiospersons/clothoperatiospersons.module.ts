import { Module } from '@nestjs/common';
import { ClothoperatiospersonsService } from './clothoperatiospersons.service';
import { ClothoperatiospersonsController } from './clothoperatiospersons.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {ClothOperationPerson} from "./clothoperatiospersons.model";
import {AuthModule} from "../auth/auth.module";
import {HistoriesModule} from "../histories/histories.module";
import {Person} from "../persons/persons.model";
import {ClothOperation} from "../clothoperations/clothoperations.model";

@Module({
  providers: [ClothoperatiospersonsService],
  controllers: [ClothoperatiospersonsController],
  imports: [
      SequelizeModule.forFeature([ClothOperationPerson, Person, ClothOperation]),
      AuthModule, HistoriesModule
  ]
})
export class ClothoperatiospersonsModule {}
