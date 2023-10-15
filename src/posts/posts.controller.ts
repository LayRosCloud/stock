import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PostEntity from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('Должности')
@Controller('/v1/posts')
export class PostsController {
    @ApiOperation({summary: 'Получение всех должностей'})
    @ApiResponse({status: 200, type: [PostEntity]})
    @Get()
    async getAll(){

    }

    @ApiOperation({summary: 'Получение должности по id'})
    @ApiResponse({status: 200, type: PostEntity})
    @Get('/:id')
    async get(@Param('id') id:number){

    }

    @ApiOperation({summary: 'Создание должности'})
    @ApiResponse({status: 200, type: PostEntity})
    @Post()
    async create(@Body()  dto: CreatePostDto){

    }
    
    @ApiOperation({summary: 'Обновление данных должности по id'})
    @ApiResponse({status: 200, type: PostEntity})
    @Put('/:id')
    async update(@Body()  dto: CreatePostDto, @Param('id') id: number){

    }

    @ApiOperation({summary: 'Удаление должности по id'})
    @ApiResponse({status: 200})
    @Delete('/:id')
    async delete(@Param('id') id: number){

    }
}
