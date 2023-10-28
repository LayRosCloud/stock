import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PersonsService} from "./persons.service";
import { CreatePersonDto } from './dto/create-person.dto';
import {LoginPersonDto} from "./dto/login-person.dto";
import {GetterPersonDto} from "./dto/getter-person.dto";
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

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
    async update(@Body() dto: CreatePersonDto, @Param('id') id: number){
        return await this.personsService.update(id, dto);
    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200})
    @Roles('EMPLOYEE')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number){
        return await this.personsService.delete(id);
    }
}
