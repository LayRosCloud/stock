import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from './permissions.model';
import { CreatePermissionDto } from './dto/create-permission.dto';
import {PostsService} from "../posts/posts.service";
import {PermissionsService} from "./permissions.service";

@ApiTags('Должности людей')
@Controller('/v1/permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

    @ApiOperation({summary: 'Получение всех должностей'})
    @ApiResponse({status: 200, type: [Permission]})
    @Get()
    async getAll(){
        return await this.permissionsService.getAll();
    }

    @ApiOperation({summary: 'Получение должности по id'})
    @ApiResponse({status: 200, type: Permission})
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.permissionsService.get(id);
    }

    @ApiOperation({summary: 'Создание должности'})
    @ApiResponse({status: 200, type: Permission})
    @Post()
    async create(@Body()  dto: CreatePermissionDto){
        return await this.permissionsService.create(dto);
    }
    
    @ApiOperation({summary: 'Обновление данных должности по id'})
    @ApiResponse({status: 200, type: Permission})
    @Put('/:id')
    async update(@Body()  dto: CreatePermissionDto, @Param('id') id: number){
        return await this.permissionsService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление должности по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){
        return await this.permissionsService.delete(id);
    }
}
