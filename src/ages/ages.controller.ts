import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Age } from './ages.model';
import { CreateAgeDto } from './dto/create-age.dto';

@ApiTags('Возрастные группы')
@Controller('/v1/ages')
export class AgesController {
    @ApiOperation({summary: 'Получение всех возрастных групп'})
    @ApiResponse({status: 200, type: [Age]})
    @Get()
    async getAll(){

    }

    @ApiOperation({summary: 'Получение возрастной группы по id'})
    @ApiResponse({status: 200, type: Age})
    @Get('/:id')
    async get(@Param('id') id:number){

    }

    @ApiOperation({summary: 'Создание возрастной группы'})
    @ApiResponse({status: 200, type: Age})
    @Post()
    async create(@Body()  dto: CreateAgeDto){

    }
    
    @ApiOperation({summary: 'Обновление данных возрастной группы по id'})
    @ApiResponse({status: 200, type: Age})
    @Put('/:id')
    async update(@Body()  dto: CreateAgeDto, @Param('id') id: number){

    }

    @ApiOperation({summary: 'Удаление возрастной группы по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){

    }
}
