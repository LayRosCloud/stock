import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from './permissions.model';
import { CreatePermissionDto } from './dto/create-permission.dto';
import {PermissionsService} from "./permissions.service";
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Должности людей')
@Controller('/v1/permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

    @ApiOperation({summary: 'Получение всех должностей'})
    @ApiResponse({status: 200, type: [Permission]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return await this.permissionsService.getAll();
    }

    @ApiOperation({summary: 'Получение должности по id'})
    @ApiResponse({status: 200, type: Permission})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.permissionsService.get(id);
    }

    @ApiOperation({summary: 'Создание должности'})
    @ApiResponse({status: 200, type: Permission})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body()  dto: CreatePermissionDto, @Req() req){
        return await this.permissionsService.create(dto, req.user);
    }
    
    @ApiOperation({summary: 'Обновление данных должности по id'})
    @ApiResponse({status: 200, type: Permission})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body()  dto: CreatePermissionDto, @Param('id') id: number, @Req() req){
        return await this.permissionsService.update(id, dto, req.user);
    }

    @ApiOperation({summary: 'Удаление должности по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req){
        return await this.permissionsService.delete(id, req.user);
    }
}
