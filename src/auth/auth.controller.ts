import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {LoginPersonDto} from "../persons/dto/login-person.dto";
import {CreatePersonDto} from "../persons/dto/create-person.dto";
import {AuthService} from "./auth.service";
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

    @Post('/register')
    async register(@Body() dto: CreatePersonDto){
        return this.authService.registration(dto)
    }
}
