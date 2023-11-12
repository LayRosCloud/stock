import {Controller, Get, Post, Body, Put, Param, Delete, Req, UseGuards} from '@nestjs/common';
import { ModeloperationsService } from './modeloperations.service';
import { CreateModeloperationDto } from './dto/create-modeloperation.dto';
import { UpdateModeloperationDto } from './dto/update-modeloperation.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "../auth/roles.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {ModelOperation} from "./entities/modeloperation.entity";

@ApiTags('Операции над моделью')
@Controller('/v1/modeloperations')
export class ModeloperationsController {
  constructor(private readonly modeloperationsService: ModeloperationsService) {}

  @ApiOperation({summary: 'Создание операции над моделью'})
  @ApiResponse({status: 201, type: ModelOperation})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createModeloperationDto: CreateModeloperationDto, @Req() req) {
    return this.modeloperationsService.create(createModeloperationDto, req.user);
  }

  @ApiOperation({summary: 'Получение всех операций над моделью'})
  @ApiResponse({status: 200, type: [ModelOperation]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.modeloperationsService.findAll();
  }

  @ApiOperation({summary: 'Получение модели'})
  @ApiResponse({status: 200, type: ModelOperation})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.modeloperationsService.findOne(id);
  }

  @ApiOperation({summary: 'Обновление операции над моделью'})
  @ApiResponse({status: 201, type: ModelOperation})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateModelOperationDto: UpdateModeloperationDto, @Req() req) {
    return this.modeloperationsService.update(id, updateModelOperationDto, req.user);
  }

  @ApiOperation({summary: 'Удаление операции над моделью'})
  @ApiResponse({status: 200})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    return this.modeloperationsService.remove(id, req.user);
  }
}
