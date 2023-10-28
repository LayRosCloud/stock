import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Price } from './prices.model';
import { CreatePriceDto } from './dto/create-price.dto';
import {SizesService} from "../sizes/sizes.service";
import {PricesService} from "./prices.service";
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Цены')
@Controller('/v1/prices')
export class PricesController {

    constructor(private readonly pricesService: PricesService) {}

    @ApiOperation({summary: 'Получение всех цен'})
    @ApiResponse({status: 200, type: [Price]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return this.pricesService.getAll();
    }

    @ApiOperation({summary: 'Получение цены по id'})
    @ApiResponse({status: 200, type: Price})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id:number){
        return this.pricesService.get(id);
    }

    @ApiOperation({summary: 'Создание цены'})
    @ApiResponse({status: 200, type: Price})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() dto: CreatePriceDto){
        return this.pricesService.create(dto);
    }
    
    @ApiOperation({summary: 'Обновление данных цен по id'})
    @ApiResponse({status: 200, type: Price})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body()  dto: CreatePriceDto, @Param('id') id: number){
        return this.pricesService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление цен по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number){
        return this.pricesService.delete(id);
    }
}
