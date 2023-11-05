import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {MaterialsService} from "./materials.service";
import {CreateMaterialDto} from "./dto/create-material.dto";
import {Material} from "./materials.model";

@ApiTags('Материалы')
@Controller('/v1/materials')
export class MaterialsController {
    constructor(private readonly materialService: MaterialsService) {}

    @ApiOperation({summary: 'Получение всех материалов'})
    @ApiResponse({status: 200, type: [Material]})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return await this.materialService.getAll();
    }

    @ApiOperation({summary: 'Получение материала по id'})
    @ApiResponse({status: 201, type: Material})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id: number){
        return await this.materialService.get(id);
    }

    @ApiOperation({summary: 'Создание материала'})
    @ApiResponse({status: 201, type: Material})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() dto: CreateMaterialDto, @Req() req){
        return await this.materialService.create(dto, req.user);
    }

    @ApiOperation({summary: 'Обновление данных материала по id'})
    @ApiResponse({status: 201, type: Material})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body() dto: CreateMaterialDto, @Param('id') id: number, @Req() req){
        return await this.materialService.update(id, dto, req.user);
    }

    @ApiOperation({summary: 'Удаление материала по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req){
        return await this.materialService.delete(id, req.user);
    }
}
