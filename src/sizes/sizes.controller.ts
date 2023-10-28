import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Size } from './sizes.model';
import { CreateSizeDto } from './dto/create-size.dto';
import {SizesService} from "./sizes.service";
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Размеры')
@Controller('/v1/sizes')
export class SizesController {
    constructor(private readonly sizesService: SizesService) {}

    @ApiOperation({summary: 'Получение всех размеров'})
    @ApiResponse({status: 200, type: [Size]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return await this.sizesService.getAll()
    }

    @ApiOperation({summary: 'Получение размера по id'})
    @ApiResponse({status: 200, type: Size})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.sizesService.get(id);
    }

    @ApiOperation({summary: 'Создание размера'})
    @ApiResponse({status: 200, type: Size})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body()  dto: CreateSizeDto){
        return await this.sizesService.create(dto);
    }
    
    @ApiOperation({summary: 'Обновление данных размера по id'})
    @ApiResponse({status: 200, type: Size})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body()  dto: CreateSizeDto, @Param('id') id: number){
        return await this.sizesService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление размера по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number){
        return await this.sizesService.delete(id);
    }
}
