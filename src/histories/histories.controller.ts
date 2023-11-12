import {Controller, Get, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {HistoriesService} from "./histories.service";
import {History} from "./histories.model";

@ApiTags('Цвета')
@Controller('/v1/histories')
export class HistoriesController {
    constructor(private readonly historiesService: HistoriesService) {}

    @ApiOperation({summary: 'Получение всей истории'})
    @ApiResponse({status: 200, type: [History]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return await this.historiesService.getAll();
    }
}
