import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PackagesService} from "./packages.service";
import {Package} from "./packages.model";
import {CreatePackageDto} from "./dto/create-package.dto";

@ApiTags('Пачки')
@Controller('/v1/packages')
export class PackagesController {
    constructor(private readonly packagesService: PackagesService) {}

    @ApiOperation({summary: 'Получение всех пачек'})
    @ApiResponse({status: 200, type: [Package]})
    @Get()
    async getAll(){
        return await this.packagesService.getAll();
    }

    @ApiOperation({summary: 'Получение пачки по id'})
    @ApiResponse({status: 200, type: Package})
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.packagesService.get(id);
    }

    @ApiOperation({summary: 'Создание пачки'})
    @ApiResponse({status: 201, type: Package})
    @Post()
    async create(@Body()  dto: CreatePackageDto){
        return await this.packagesService.create(dto);
    }

    @ApiOperation({summary: 'Создание пачек'})
    @ApiResponse({status: 201, type: [Package]})
    @Post('/range')
    async createRange(@Body() dtos: CreatePackageDto[]){
        return await this.packagesService.createRange(dtos);
    }

    @ApiOperation({summary: 'Обновление данных пачки по id'})
    @ApiResponse({status: 200, type: Package})
    @Put('/:id')
    async update(@Body() dto: CreatePackageDto, @Param('id') id: number){
        return await this.packagesService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление пачки по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){
        return await this.packagesService.delete(id);
    }
}
