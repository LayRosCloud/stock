import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Size } from './sizes.model';
import { CreateSizeDto } from './dto/create-size.dto';

@ApiTags('Размеры')
@Controller('/v1/sizes')
export class SizesController {
    @ApiOperation({summary: 'Получение всех размеров'})
    @ApiResponse({status: 200, type: [Size]})
    @Get()
    async getAll(){

    }

    @ApiOperation({summary: 'Получение размера по id'})
    @ApiResponse({status: 200, type: Size})
    @Get('/:id')
    async get(@Param('id') id:number){

    }

    @ApiOperation({summary: 'Создание размера'})
    @ApiResponse({status: 200, type: Size})
    @Post()
    async create(@Body()  dto: CreateSizeDto){

    }
    
    @ApiOperation({summary: 'Обновление данных размера по id'})
    @ApiResponse({status: 200, type: Size})
    @Put('/:id')
    async update(@Body()  dto: CreateSizeDto, @Param('id') id: number){

    }

    @ApiOperation({summary: 'Удаление размера по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){

    }
}
