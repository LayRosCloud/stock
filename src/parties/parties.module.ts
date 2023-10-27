import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Party } from './parties.model';
import { ModelEntity } from 'src/models/models.model';
import { Size } from 'src/sizes/sizes.model';
import { Person } from 'src/persons/persons.model';
import {Package} from "../packages/packages.model";

@Module({
  providers: [PartiesService],
  controllers: [PartiesController],
  imports: [
    SequelizeModule.forFeature([Party, ModelEntity, Package, Person, Size])
]
})
export class PartiesModule {}
