import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {CreateActionDto} from "./dto/create-action.dto";
import {ActionsService} from "./actions.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {Age} from "../ages/ages.model";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {CreateAgeDto} from "../ages/dto/create-age.dto";
import {Action} from "./action.model";

@Controller('/v1/actions')
export class ActionsController {
    constructor(private readonly actionsService: ActionsService) {}
    @ApiOperation({summary: 'Получение всех возрастных групп'})
    @ApiResponse({status: 200, type: [Action]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return this.actionsService.getAll();
    }

    @ApiOperation({summary: 'Получение возрастной группы по id'})
    @ApiResponse({status: 201, type: Action})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id:number){
        return this.actionsService.get(id);
    }

    @ApiOperation({summary: 'Создание возрастной группы'})
    @ApiResponse({status: 201, type: Action})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body()  dto: CreateAgeDto, @Req() req){
        return this.actionsService.create(dto, req.user)
    }

    @ApiOperation({summary: 'Обновление данных возрастной группы по id'})
    @ApiResponse({status: 201, type: Action})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body()  dto: CreateAgeDto, @Param('id') id: number, @Req() req){
        return this.actionsService.update(id, dto, req.user)
    }

    @ApiOperation({summary: 'Удаление возрастной группы по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req){
        return this.actionsService.delete(id, req.user)
    }
}
