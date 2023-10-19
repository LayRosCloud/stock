import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Party } from './parties.model';
import { CreatePartyDto } from './dto/create-party.dto';
import {PermissionsService} from "../permissions/permissions.service";
import {PartiesService} from "./parties.service";

@ApiTags('Партии')
@Controller('/v1/parties')
export class PartiesController {
    constructor(private readonly partiesService: PartiesService) {}

    @ApiOperation({summary: 'Получение всех партий'})
    @ApiResponse({status: 200, type: [Party]})
    @Get()
    async getAll(){
        return await this.partiesService.getAll();
    }

    @ApiOperation({summary: 'Получение партии по id'})
    @ApiResponse({status: 200, type: Party})
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.partiesService.get(id);
    }

    @ApiOperation({summary: 'Создание партии'})
    @ApiResponse({status: 200, type: Party})
    @Post()
    async create(@Body()  dto: CreatePartyDto){
        return await this.partiesService.create(dto);
    }
    
    @ApiOperation({summary: 'Обновление данных партии по id'})
    @ApiResponse({status: 200, type: Party})
    @Put('/:id')
    async update(@Body()  dto: CreatePartyDto, @Param('id') id: number){
        return await this.partiesService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление партии по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){
        return await this.partiesService.delete(id);
    }
}
