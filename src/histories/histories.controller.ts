import {Controller, Get, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Color} from "../colors/colors.model";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {HistoriesService} from "./histories.service";

@ApiTags('Цвета')
@Controller('/v1/histories')
export class HistoriesController {
    constructor(private readonly historiesService: HistoriesService) {}

    @ApiOperation({summary: 'Получение всей истории'})
    @ApiResponse({status: 200, type: [Color]})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return await this.historiesService.getAll();
    }
}
