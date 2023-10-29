import {Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import { ClothOperation } from './clothoperations.model';
import { CreateClothOperationDto } from './dto/create-clothoperation.dto';
import {ClothoperationsService} from "./clothoperations.service";
import { Roles } from 'src/auth/roles.decorator';
import { UpdateClothOperationDto } from './dto/update-clothoperation.dto';

@ApiTags('Операции над партией')
@Controller('/v1/clothoperations')
export class ClothoperationsController {

    constructor(private readonly clothOperationsRepository: ClothoperationsService) {}

    @ApiOperation({summary: 'Получение всех операций партии'})
    @ApiResponse({status: 200, type: [ClothOperation]})
    @ApiQuery({name: 'packageId', required: false})
    @Roles('ADMIN')
    @Get()
    async getAll(@Req() req){
        const packageId = req.query['packageId']
        return await this.clothOperationsRepository.getAll(packageId);
    }

    @ApiOperation({summary: 'Получение операции на партии по id'})
    @ApiResponse({status: 200, type: ClothOperation})
    @Roles('ADMIN')
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.clothOperationsRepository.get(id);
    }

    @ApiOperation({summary: 'Создание операции на партии'})
    @ApiResponse({status: 200, type: ClothOperation})
    @Roles('ADMIN')
    @Post()
    async create(@Body() dto: CreateClothOperationDto){
        return await this.clothOperationsRepository.create(dto);
    }
    
    @ApiOperation({summary: 'Обновление данных операции на партии по id'})
    @ApiResponse({status: 200, type: ClothOperation})
    @Roles('ADMIN')
    @Put('/:id')
    async update(@Body()  dto: UpdateClothOperationDto, @Param('id') id: number){
        return await this.clothOperationsRepository.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление операции на партии по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @Delete('/:id')
    async delete(@Param('id') id: number){
        return await this.clothOperationsRepository.delete(id);
    }
}
