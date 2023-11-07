import {Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Req, UseGuards, UsePipes} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PersonsService} from "./persons.service";
import { CreatePersonDto } from './dto/create-person.dto';
import {LoginPersonDto} from "./dto/login-person.dto";
import {GetterPersonDto} from "./dto/getter-person.dto";
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Люди')
@Controller('/v1/persons')
export class PersonsController {
    constructor(private readonly personsService: PersonsService) {}
    
    @Get()
    @ApiOperation({summary: 'Получение пользователей'})
    @UseGuards(JwtAuthGuard)
    @ApiResponse({status: 200, type: [GetterPersonDto]})
    @Roles('EMPLOYEE')
    @UseGuards(RolesGuard)
    async getAll(){
        return await this.personsService.getAll();
    }
    
    @Get('/:id')
    @ApiOperation({summary: 'Получение пользователя по id'})
    @ApiResponse({status: 200, type: GetterPersonDto})
    @Roles('EMPLOYEE')
    @UseGuards(RolesGuard)
    async get(@Param('id') id: number){
        return await this.personsService.get(id);
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @ApiResponse({status: 201, type: GetterPersonDto})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UsePipes(ValidationPipe)
    @Post()
    async register(@Body() dto: CreatePersonDto){
        return await this.personsService.register(dto);
    }

    @ApiOperation({summary: 'Валидация пользователей'})
    @ApiResponse({status: 201, type: GetterPersonDto})
    @Post('/login')
    async login(@Body() dto: LoginPersonDto){
        return await this.personsService.login(dto);
    }

    @ApiOperation({summary: 'Обновление данных пользователя'})
    @ApiResponse({status: 200, type: GetterPersonDto})
    @Roles('EMPLOYEE')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body() dto: CreatePersonDto, @Param('id') id: number, @Req() req){
        const user = req.user;
        let isHas;
        user.posts.forEach(post => {
            if(post.name === 'ADMIN'){
                isHas = true;
            }
        })
        if(!isHas){
            if(user.id !== id){
                throw new ForbiddenException('Ошибка! Недостаточно прав изменить другого пользователя')
            }
        }
        return await this.personsService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req){
        return await this.personsService.delete(id);
    }
}
