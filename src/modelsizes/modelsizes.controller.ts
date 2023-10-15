import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ModelSize } from './modelsizes.model';
import { CreateModelSizeDto } from './dto/create-modelsize.dto';

@ApiTags('Размеры модели')
@Controller('/v1/modelsizes')
export class ModelsizesController {
    @ApiOperation({summary: 'Получение всех размеров одежды'})
    @ApiResponse({status: 200, type: [ModelSize]})
    @Get()
    async getAll(){

    }

    @ApiOperation({summary: 'Получение размера одежды по id'})
    @ApiResponse({status: 200, type: ModelSize})
    @Get('/:id')
    async get(@Param('id') id:number){

    }

    @ApiOperation({summary: 'Создание размера одежды'})
    @ApiResponse({status: 200, type: ModelSize})
    @Post()
    async create(@Body()  dto: CreateModelSizeDto){

    }
    
    @ApiOperation({summary: 'Обновление данных размера одежды по id'})
    @ApiResponse({status: 200, type: ModelSize})
    @Put('/:id')
    async update(@Body()  dto: CreateModelSizeDto, @Param('id') id: number){

    }

    @ApiOperation({summary: 'Удаление размера одежды по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){

    }
}
