import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Price } from './prices.model';
import { CreatePriceDto } from './dto/create-price.dto';

@ApiTags('Цены')
@Controller('/v1/prices')
export class PricesController {
    @ApiOperation({summary: 'Получение всех цен'})
    @ApiResponse({status: 200, type: [Price]})
    @Get()
    async getAll(){

    }

    @ApiOperation({summary: 'Получение цены по id'})
    @ApiResponse({status: 200, type: Price})
    @Get('/:id')
    async get(@Param('id') id:number){

    }

    @ApiOperation({summary: 'Создание цены'})
    @ApiResponse({status: 200, type: Price})
    @Post()
    async create(@Body()  dto: CreatePriceDto){

    }
    
    @ApiOperation({summary: 'Обновление данных цен по id'})
    @ApiResponse({status: 200, type: Price})
    @Put('/:id')
    async update(@Body()  dto: CreatePriceDto, @Param('id') id: number){

    }

    @ApiOperation({summary: 'Удаление цен по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){

    }
}
