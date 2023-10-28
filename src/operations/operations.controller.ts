import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Operation } from './operations.model';
import { CreateOperationDto } from './dto/create-operation.dto';
import {OperationsService} from "./operations.service";
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Операции')
@Controller('/v1/operations')
export class OperationsController {

    constructor(private readonly operationsService: OperationsService) {}

    @ApiOperation({summary: 'Получение всех операций'})
    @ApiResponse({status: 200, type: [Operation]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return this.operationsService.getAll();
    }

    @ApiOperation({summary: 'Получение операции по id'})
    @ApiResponse({status: 200, type: Operation})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id:number){
        return this.operationsService.get(id);
    }

    @ApiOperation({summary: 'Создание операции'})
    @ApiResponse({status: 200, type: Operation})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body()  dto: CreateOperationDto){
        return this.operationsService.create(dto);
    }
    
    @ApiOperation({summary: 'Обновление данных операций по id'})
    @ApiResponse({status: 200, type: Operation})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body()  dto: CreateOperationDto, @Param('id') id: number){
        return this.operationsService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление операции по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number){
        return this.operationsService.delete(id);
    }
}
