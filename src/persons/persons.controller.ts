import {Controller, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {PersonsService} from "./persons.service";

@ApiTags('Ссылки')
@Controller('')
export class PersonsController {
    constructor(private readonly personsService: PersonsService) {}
    
    @Get()
    getAll(): Object[]{
        return this.personsService.getAll();
    }
}
