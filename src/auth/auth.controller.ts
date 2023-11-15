import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {LoginPersonDto} from "../persons/dto/login-person.dto";
import {CreatePersonDto} from "../persons/dto/create-person.dto";
import {AuthService} from "./auth.service";
import {Roles} from "./roles.decorator";
import {RolesGuard} from "./roles.guard";
@ApiTags('Авторизация')
@Controller('/v1/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/')
    async login(@Body() dto: LoginPersonDto){
        return this.authService.login(dto)
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/register')
    async register(@Body() dto: CreatePersonDto){
        return this.authService.registration(dto)
    }
}
