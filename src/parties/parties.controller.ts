import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Party } from './parties.model';
import { CreatePartyDto } from './dto/create-party.dto';
import {PartiesService} from "./parties.service";
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdatePartyDto } from './dto/update-party.dto';

@ApiTags('Партии')
@Controller('/v1/parties')
export class PartiesController {
    constructor(private readonly partiesService: PartiesService) {}

    @ApiOperation({summary: 'Получение всех партий'})
    @ApiResponse({status: 200, type: [Party]})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(){
        return await this.partiesService.getAll();
    }

    @ApiOperation({summary: 'Получение партии по id'})
    @ApiResponse({status: 200, type: Party})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Get('/:id')
    async get(@Param('id') id:number){
        return await this.partiesService.get(id);
    }

    @ApiOperation({summary: 'Создание партии'})
    @ApiResponse({status: 200, type: Party})
    @Roles('CUTTER')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body()  dto: CreatePartyDto, @Req() req){
        return await this.partiesService.create(dto, req.user);
    }
    
    @ApiOperation({summary: 'Обновление данных партии по id'})
    @ApiResponse({status: 200, type: Party})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async update(@Body()  dto: UpdatePartyDto, @Param('id') id: number, @Req() req){
        return await this.partiesService.update(id, dto, req.user);
    }

    @ApiOperation({summary: 'Удаление партии по id'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number, @Req() req){
        return await this.partiesService.delete(id, req.user);
    }
}
