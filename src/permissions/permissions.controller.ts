import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from './permissions.model';
import { CreatePermissionDto } from './dto/create-permission.dto';

@ApiTags('Должности людей')
@Controller('/v1/permissions')
export class PermissionsController {
    @ApiOperation({summary: 'Получение всех должностей'})
    @ApiResponse({status: 200, type: [Permission]})
    @Get()
    async getAll(){

    }

    @ApiOperation({summary: 'Получение должности по id'})
    @ApiResponse({status: 200, type: Permission})
    @Get('/:id')
    async get(@Param('id') id:number){

    }

    @ApiOperation({summary: 'Создание должности'})
    @ApiResponse({status: 200, type: Permission})
    @Post()
    async create(@Body()  dto: CreatePermissionDto){

    }
    
    @ApiOperation({summary: 'Обновление данных должности по id'})
    @ApiResponse({status: 200, type: Permission})
    @Put('/:id')
    async update(@Body()  dto: CreatePermissionDto, @Param('id') id: number){

    }

    @ApiOperation({summary: 'Удаление должности по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){

    }
}
