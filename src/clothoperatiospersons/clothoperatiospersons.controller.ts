import {Body, Controller, Delete, Get, Param, Post, Put, Req} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {Roles} from "../auth/roles.decorator";
import {ClothOperationPerson} from "./clothoperatiospersons.model";
import {ClothoperatiospersonsService} from "./clothoperatiospersons.service";
import {CreateClothoperationpersonDto} from "./dto/create-clothoperationperson.dto";
import {UpdateClothoperationpersonDto} from "./dto/update-clothoperationperson.dto";

@Controller('clothoperatiospersons')
export class ClothoperatiospersonsController {

    constructor(private readonly clothOperationPersonRepository: ClothoperatiospersonsService) {}

    @ApiOperation({summary: 'Получение всех операций партии'})
    @ApiResponse({status: 200, type: [ClothOperationPerson]})
    @ApiQuery({name: 'packageId', required: false})
    @Roles('ADMIN')
    @Get()
    async getAll(@Req() req){
        return await this.clothOperationPersonRepository.getAll();
    }

    @ApiOperation({summary: 'Получение операции на партии по id'})
    @ApiResponse({status: 200, type: ClothOperationPerson})
    @Roles('ADMIN')
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.clothOperationPersonRepository.get(id);
    }

    @ApiOperation({summary: 'Создание операции на партии'})
    @ApiResponse({status: 201, type: ClothOperationPerson})
    @Roles('ADMIN')
    @Post()
    async create(@Body() dto: CreateClothoperationpersonDto, @Req() req){
        return await this.clothOperationPersonRepository.create(dto, req.user);
    }

    @ApiOperation({summary: 'Обновление данных операции на партии по id'})
    @ApiResponse({status: 201, type: ClothOperationPerson})
    @Roles('ADMIN')
    @Put('/:id')
    async update(@Body()  dto: UpdateClothoperationpersonDto, @Param('id') id: number, @Req() req){
        return await this.clothOperationPersonRepository.update(id, dto, req.user);
    }

    @ApiOperation({summary: 'Удаление операции на партии по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req){
        return await this.clothOperationPersonRepository.delete(id, req.user);
    }
}
