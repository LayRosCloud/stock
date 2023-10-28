import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PostEntity from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';
import { Roles } from 'src/auth/roles.decorator';
import { PostsService } from './posts.service';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Должности')
@Controller('/v1/posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    @ApiOperation({summary: 'Получение всех должностей'})
    @ApiResponse({status: 200, type: [PostEntity]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return await this.postsService.getAll();
    }

    @ApiOperation({summary: 'Получение должности по id'})
    @ApiResponse({status: 200, type: PostEntity})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.postsService.get(id);
    }

    @ApiOperation({summary: 'Создание должности'})
    @ApiResponse({status: 200, type: PostEntity})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body()  dto: CreatePostDto){
        return await this.postsService.create(dto);
    }
    
    @ApiOperation({summary: 'Обновление данных должности по id'})
    @ApiResponse({status: 200, type: PostEntity})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body()  dto: CreatePostDto, @Param('id') id: number){
        return await this.postsService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление должности по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number){
        return await this.postsService.delete(id);
    }
}
