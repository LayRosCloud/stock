import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Age } from './ages.model';
import { CreateAgeDto } from './dto/create-age.dto';
import {ClothoperationsService} from "../clothoperations/clothoperations.service";
import {AgesService} from "./ages.service";
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Возрастные группы')
@Controller('/v1/ages')
export class AgesController {

    constructor(private readonly agesRepository: AgesService) {}

    @ApiOperation({summary: 'Получение всех возрастных групп'})
    @ApiResponse({status: 200, type: [Age]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return this.agesRepository.getAll();
    }

    @ApiOperation({summary: 'Получение возрастной группы по id'})
    @ApiResponse({status: 200, type: Age})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id:number){
        return this.agesRepository.get(id);
    }

    @ApiOperation({summary: 'Создание возрастной группы'})
    @ApiResponse({status: 200, type: Age})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body()  dto: CreateAgeDto, @Req() req){
        return this.agesRepository.create(dto, req.user)
    }
    
    @ApiOperation({summary: 'Обновление данных возрастной группы по id'})
    @ApiResponse({status: 200, type: Age})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body()  dto: CreateAgeDto, @Param('id') id: number, @Req() req){
        return this.agesRepository.update(id, dto, req.user)
    }

    @ApiOperation({summary: 'Удаление возрастной группы по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req){
        return this.agesRepository.delete(id, req.user)
    }
}
