import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {ColorsService} from "./colors.service";
import {Color} from "./colors.model";
import {CreateColorDto} from "./dto/create-color.dto";

@ApiTags('Цвета')
@Controller('/v1/colors')
export class ColorsController {
    constructor(private readonly colorsService: ColorsService) {}

    @ApiOperation({summary: 'Получение всех моделей'})
    @ApiResponse({status: 200, type: [Color]})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return await this.colorsService.getAll();
    }

    @ApiOperation({summary: 'Получение модели по id'})
    @ApiResponse({status: 201, type: Color})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id: number){
        return await this.colorsService.get(id);
    }

    @ApiOperation({summary: 'Создание моделей'})
    @ApiResponse({status: 201, type: Color})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() dto: CreateColorDto, @Req() req){
        return await this.colorsService.create(dto, req.user);
    }

    @ApiOperation({summary: 'Обновление данных модели по id'})
    @ApiResponse({status: 201, type: Color})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body() dto: CreateColorDto, @Param('id') id: number, @Req() req){
        return await this.colorsService.update(id, dto, req.user);
    }

    @ApiOperation({summary: 'Удаление модели по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req){
        return await this.colorsService.delete(id, req.user);
    }
}
