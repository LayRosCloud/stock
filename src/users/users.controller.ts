import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "./users.model";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Пользователи')
@Controller('v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll(): Promise<User[]>{
        return this.usersService.getAll();
    }

    @ApiOperation({summary: 'Получение одного пользователя'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    get(@Param('id') id: String): Promise<User>{
        return this.usersService.get(id);
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @ApiResponse({status: 201, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto): Promise<User>{
        return this.usersService.register(userDto);
    }
    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200, type: Object})
    @Delete(':id')
    delete(@Param('id') id: string): Promise<Object>{
        return this.usersService.delete(id);
    }
}
