import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Party } from './parties.model';
import { ModelEntity } from 'src/models/models.model';
import { Size } from 'src/sizes/sizes.model';
import { Person } from 'src/persons/persons.model';
import {Package} from "../packages/packages.model";
import { AuthModule } from 'src/auth/auth.module';
import {HistoriesModule} from "../histories/histories.module";
import {Price} from "../prices/prices.model";

@Module({
  providers: [PartiesService],
  controllers: [PartiesController],
  imports: [
    SequelizeModule.forFeature([Party, ModelEntity, Package, Person, Size, Price]),
    AuthModule,
    HistoriesModule
]
})
export class PartiesModule {}
