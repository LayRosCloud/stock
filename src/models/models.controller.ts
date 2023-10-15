import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ModelEntity } from './models.model';
import { CreateModelDto } from './dto/create-model.dto';

@ApiTags('Модели')
@Controller('/v1/models')
export class ModelsController {
    @ApiOperation({summary: 'Получение всех моделей'})
    @ApiResponse({status: 200, type: [ModelEntity]})
    @Get()
    async getAll(){

    }

    @ApiOperation({summary: 'Получение модели по id'})
    @ApiResponse({status: 200, type: ModelEntity})
    @Get('/:id')
    async get(@Param('id') id:number){

    }

    @ApiOperation({summary: 'Создание моделей'})
    @ApiResponse({status: 200, type: ModelEntity})
    @Post()
    async create(@Body() dto: CreateModelDto){

    }
    
    @ApiOperation({summary: 'Обновление данных модели по id'})
    @ApiResponse({status: 200, type: ModelEntity})
    @Put('/:id')
    async update(@Body() dto: CreateModelDto, @Param('id') id: number){

    }

    @ApiOperation({summary: 'Удаление модели по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){

    }
}
