import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ModelSize } from './modelsizes.model';
import { CreateModelSizeDto } from './dto/create-modelsize.dto';
import {ModelsizesService} from "./modelsizes.service";
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Размеры модели')
@Controller('/v1/modelsizes')
export class ModelsizesController {

    constructor(private readonly modelSizesService: ModelsizesService) {}
    @ApiOperation({summary: 'Получение всех размеров одежды'})
    @ApiResponse({status: 200, type: [ModelSize]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return await this.modelSizesService.getAll();
    }

    @ApiOperation({summary: 'Получение размера одежды по id'})
    @ApiResponse({status: 200, type: ModelSize})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.modelSizesService.get(id);
    }

    @ApiOperation({summary: 'Создание размера одежды'})
    @ApiResponse({status: 200, type: ModelSize})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body()  dto: CreateModelSizeDto, @Req() req){
        return await this.modelSizesService.create(dto, req.user);
    }
    
    @ApiOperation({summary: 'Обновление данных размера одежды по id'})
    @ApiResponse({status: 200, type: ModelSize})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body()  dto: CreateModelSizeDto, @Param('id') id: number, @Req() req){
        return await this.modelSizesService.update(id, dto, req.user);
    }

    @ApiOperation({summary: 'Удаление размера одежды по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req){
        return await this.modelSizesService.delete(id, req.user);
    }
}
