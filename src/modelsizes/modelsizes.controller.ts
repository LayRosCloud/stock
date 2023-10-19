import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ModelSize } from './modelsizes.model';
import { CreateModelSizeDto } from './dto/create-modelsize.dto';
import {ModelsizesService} from "./modelsizes.service";

@ApiTags('Размеры модели')
@Controller('/v1/modelsizes')
export class ModelsizesController {

    constructor(private readonly modelSizesService: ModelsizesService) {}
    @ApiOperation({summary: 'Получение всех размеров одежды'})
    @ApiResponse({status: 200, type: [ModelSize]})
    @Get()
    async getAll(){
        return await this.modelSizesService.getAll();
    }

    @ApiOperation({summary: 'Получение размера одежды по id'})
    @ApiResponse({status: 200, type: ModelSize})
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.modelSizesService.get(id);
    }

    @ApiOperation({summary: 'Создание размера одежды'})
    @ApiResponse({status: 200, type: ModelSize})
    @Post()
    async create(@Body()  dto: CreateModelSizeDto){
        return await this.modelSizesService.create(dto);
    }
    
    @ApiOperation({summary: 'Обновление данных размера одежды по id'})
    @ApiResponse({status: 200, type: ModelSize})
    @Put('/:id')
    async update(@Body()  dto: CreateModelSizeDto, @Param('id') id: number){
        return await this.modelSizesService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление размера одежды по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){
        return await this.modelSizesService.delete(id);
    }
}
