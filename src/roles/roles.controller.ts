import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RolesService} from "./roles.service";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";

@ApiTags('Роли')
@Controller('v1/roles')
export class RolesController {
    constructor(private readonly roleService: RolesService) {}

    @ApiOperation({summary: 'Получение всех ролей'})
    @ApiResponse({status: 200, type: [Role]})
    @Get()
    getAll(): Promise<Role[]>{
        return this.roleService.getAll();
    }

    @ApiOperation({summary: 'Получение роли по названию'})
    @ApiResponse({status: 200, type: Role})
    @Get(':title')
    get(@Param('title') title: string): Promise<Role>{
        return this.roleService.get(title);
    }

    @ApiOperation({summary: 'Добавление роли'})
    @ApiResponse({status: 201, type: Role})
    @Post()
    create(@Body() roleDto: CreateRoleDto): Promise<Role>{
        return this.roleService.create(roleDto);
    }
}
