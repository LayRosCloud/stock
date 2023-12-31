import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Package} from "./packages.model";
import {Size} from "../sizes/sizes.model";
import {Party} from "../parties/parties.model";
import { AuthModule } from 'src/auth/auth.module';
import {Person} from "../persons/persons.model";
import {Material} from "../materials/materials.model";
import {HistoriesModule} from "../histories/histories.module";

@Module({
  providers: [PackagesService],
  controllers: [PackagesController],
  imports: [
    SequelizeModule.forFeature([Package, Size, Party, Person, Material]),
    AuthModule,
    HistoriesModule
  ]
})
export class PackagesModule {}
