import { Module } from '@nestjs/common';
import { ClothoperationsService } from './clothoperations.service';
import { ClothoperationsController } from './clothoperations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClothOperation } from './clothoperations.model';
import { Operation } from 'src/operations/operations.model';
import { Person } from 'src/persons/persons.model';
import { Price } from 'src/prices/prices.model';
import {Package} from "../packages/packages.model";
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ClothoperationsService],
  controllers: [ClothoperationsController],
  imports: [
    SequelizeModule.forFeature([ClothOperation, Package, Person, Price, Operation]),
    AuthModule
]
})
export class ClothoperationsModule {}
