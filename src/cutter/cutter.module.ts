import { Module } from '@nestjs/common';
import {CutterService} from "./cutter.service";
import {CutterController} from "./cutter.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {WorkingPerson} from "../working-person/working-person.model";
import {Cutter} from "./cutter.model";

@Module({
    providers: [CutterService],
    controllers: [CutterController],
    imports: [
        SequelizeModule.forFeature([WorkingPerson, Cutter])
    ]
})
export class CutterModule {}
