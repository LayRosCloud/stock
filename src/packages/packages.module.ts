import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Package} from "./packages.model";
import {Size} from "../sizes/sizes.model";
import {Party} from "../parties/parties.model";

@Module({
  providers: [PackagesService],
  controllers: [PackagesController],
  imports: [
    SequelizeModule.forFeature([Package, Size, Party])
  ]
})
export class PackagesModule {}
