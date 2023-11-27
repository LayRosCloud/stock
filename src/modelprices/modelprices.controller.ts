import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ModelpricesService} from "./modelprices.service";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {CreateModelpriceDto} from "./dto/create-modelprice.dto";
import {ModelPrice} from "./modelprices.model";

@ApiTags('Цены на модель')
@Controller('/v1/modelprices')
export class ModelpricesController {
    constructor(private readonly modelpricesService: ModelpricesService) {}

    @ApiOperation({summary: 'Создание операции над моделью'})
    @ApiResponse({status: 201, type: ModelPrice})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateModelpriceDto, @Req() req) {
        return this.modelpricesService.create(dto, req.user);
    }

    @ApiOperation({summary: 'Получение операций над моделью'})
    @ApiResponse({status: 200, type: [ModelPrice]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    findAll() {
        return this.modelpricesService.getAll();
    }

    @ApiOperation({summary: 'Получение операции над моделью'})
    @ApiResponse({status: 200, type: ModelPrice})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.modelpricesService.get(+id);
    }

    @ApiOperation({summary: 'Обновление операции над моделью'})
    @ApiResponse({status: 201, type: ModelPrice})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: CreateModelpriceDto, @Req() req) {
        return this.modelpricesService.update(+id, dto, req.user);
    }

    @ApiOperation({summary: 'Удаление операции над моделью'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: number, @Req() req) {
        return this.modelpricesService.delete(id, req.user);
    }
}
