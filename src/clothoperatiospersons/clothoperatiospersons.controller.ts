import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles.decorator";
import {ClothOperationPerson} from "./clothoperatiospersons.model";
import {ClothoperatiospersonsService} from "./clothoperatiospersons.service";
import {CreateClothoperationpersonDto} from "./dto/create-clothoperationperson.dto";
import {UpdateClothoperationpersonDto} from "./dto/update-clothoperationperson.dto";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags('Участники операции')
@Controller('/v1/clothoperationspersons')
export class ClothoperatiospersonsController {

    constructor(private readonly clothOperationPersonRepository: ClothoperatiospersonsService) {}

    @ApiOperation({summary: 'Получение всех операций партии'})
    @ApiResponse({status: 200, type: [ClothOperationPerson]})
    @Roles('ADMIN')
    @ApiQuery({name: 'clothOperationId', required: false})
    @UseGuards(RolesGuard)
    @Get()
    async getAll(@Req() req){
        const clothOperationId: number = req.query['clothOperationId']
        return await this.clothOperationPersonRepository.getAll(clothOperationId);
    }

    @ApiOperation({summary: 'Получение операции на партии по id'})
    @ApiResponse({status: 200, type: ClothOperationPerson})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.clothOperationPersonRepository.get(id);
    }

    @ApiOperation({summary: 'Создание операции на партии'})
    @ApiResponse({status: 201, type: ClothOperationPerson})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() dto: CreateClothoperationpersonDto, @Req() req){
        return await this.clothOperationPersonRepository.create(dto, req.user);
    }

    @ApiOperation({summary: 'Обновление данных операции на партии по id'})
    @ApiResponse({status: 201, type: ClothOperationPerson})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
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
