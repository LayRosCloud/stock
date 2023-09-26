import { Module } from '@nestjs/common';
import {WorkingPersonController} from "./working-person.controller";
import {WorkingPersonService} from "./working-person.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {WorkingPerson} from "./working-person.model";
import {Post} from "../posts/posts.model";

@Module({
    providers: [WorkingPersonService],
    controllers: [WorkingPersonController],
    imports: [
        SequelizeModule.forFeature([WorkingPerson, Post])
    ]
})
export class WorkingPersonModule {}
