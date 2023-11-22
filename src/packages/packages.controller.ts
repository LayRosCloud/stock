import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import { PackagesService } from "./packages.service";
import { Package } from "./packages.model";
import { CreatePackageDto } from "./dto/create-package.dto";
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdatePackageDto } from "./dto/update-package.dto";

@ApiTags('Пачки')
@Controller('/v1/packages')
export class PackagesController {
    constructor(private readonly packagesService: PackagesService) {}

    @ApiOperation({summary: 'Получение всех пачек'})
    @ApiResponse({status: 200, type: [Package]})
    @ApiQuery({name: 'partyId', required: false})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(@Req() req): Promise<Package[]>{
        const month = req.query['month']
        return await this.packagesService.getAll(month);
    }

    @ApiOperation({summary: 'Получение пачки по id'})
    @ApiResponse({status: 200, type: Package})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.packagesService.get(id);
    }

    @ApiOperation({summary: 'Создание пачки'})
    @ApiResponse({status: 201, type: Package})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body()  dto: CreatePackageDto, @Req() req){
        return await this.packagesService.create(dto, req.user);
    }

    @ApiOperation({summary: 'Создание пачек'})
    @ApiResponse({status: 201, type: [Package]})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Post('/range')
    async createRange(@Body() dtos: CreatePackageDto[], @Req() req){
        return await this.packagesService.createRange(dtos, req.user);
    }

    @ApiOperation({summary: 'Обновление данных пачки по id'})
    @ApiResponse({status: 200, type: Package})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body() dto: UpdatePackageDto, @Param('id') id: number, @Req() req){
        return await this.packagesService.update(id, dto, req.user);
    }

    @ApiOperation({summary: 'Удаление пачки по id'})
    @ApiResponse({status: 200})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req){
        return await this.packagesService.delete(id, req.user);
    }
}
