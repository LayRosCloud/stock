import {Controller, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {HateoasService} from "./hateoas.service";

@ApiTags('Ссылки')
@Controller('')
export class HateoasController {
    constructor(private readonly roleService: HateoasService) {}
    
    @Get()
    getAll(): Object[]{
        return this.roleService.getAll();
    }
}
