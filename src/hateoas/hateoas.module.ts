import { Module } from '@nestjs/common';
import {HateoasService} from "./hateoas.service";
import {HateoasController} from "./hateoas.controller";

@Module({
    providers: [HateoasService],
    controllers: [HateoasController]
})
export class HateoasModule {}
