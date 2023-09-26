import { Module } from '@nestjs/common';
import {SizeService} from "./size.service";
import {SizeController} from "./size.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Size} from "./size.model";
import {Age} from "../age/age.model";

@Module({
    providers: [SizeService],
    controllers: [SizeController],
    imports: [
        SequelizeModule.forFeature([Size, Age])
    ]
})
export class SizeModule {}
