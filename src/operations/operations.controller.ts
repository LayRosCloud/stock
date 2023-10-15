import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation } from './operations.model';
import { CreateOperationDto } from './dto/create-operation.dto';

@ApiTags('Операции')
@Controller('/v1/operations')
export class OperationsController {
    @ApiOperation({summary: 'Получение всех операций'})
    @ApiResponse({status: 200, type: [Operation]})
    @Get()
    async getAll(){

    }

    @ApiOperation({summary: 'Получение операции по id'})
    @ApiResponse({status: 200, type: Operation})
    @Get('/:id')
    async get(@Param('id') id:number){

    }

    @ApiOperation({summary: 'Создание операции'})
    @ApiResponse({status: 200, type: Operation})
    @Post()
    async create(@Body()  dto: CreateOperationDto){

    }
    
    @ApiOperation({summary: 'Обновление данных операций по id'})
    @ApiResponse({status: 200, type: Operation})
    @Put('/:id')
    async update(@Body()  dto: CreateOperationDto, @Param('id') id: number){

    }

    @ApiOperation({summary: 'Удаление операции по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){

    }
}
