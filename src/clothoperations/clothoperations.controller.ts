import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClothOperation } from './clothoperations.model';
import { CreateClothOperationDto } from './dto/create-clothoperation.dto';
import {ClothoperationsService} from "./clothoperations.service";

@ApiTags('Операции над партией')
@Controller('/v1/clothoperations')
export class ClothoperationsController {

    constructor(private readonly clothOperationsRepository: ClothoperationsService) {}

    @ApiOperation({summary: 'Получение всех операций партии'})
    @ApiResponse({status: 200, type: [ClothOperation]})
    @Get()
    async getAll(){
        return await this.clothOperationsRepository.getAll();
    }

    @ApiOperation({summary: 'Получение операции на партии по id'})
    @ApiResponse({status: 200, type: ClothOperation})
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.clothOperationsRepository.get(id);
    }

    @ApiOperation({summary: 'Создание операции на партии'})
    @ApiResponse({status: 200, type: ClothOperation})
    @Post()
    async create(@Body() dto: CreateClothOperationDto){
        return await this.clothOperationsRepository.create(dto);
    }
    
    @ApiOperation({summary: 'Обновление данных операции на партии по id'})
    @ApiResponse({status: 200, type: ClothOperation})
    @Put('/:id')
    async update(@Body()  dto: CreateClothOperationDto, @Param('id') id: number){
        return await this.clothOperationsRepository.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление операции на партии по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){
        return await this.clothOperationsRepository.delete(id);
    }
}
