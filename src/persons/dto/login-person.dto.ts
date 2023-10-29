import {ApiProperty} from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";


export class LoginPersonDto{
    @ApiProperty({example: 'example@example.com', required: true, description: 'Почта пользователя'})
    @IsString({message: 'Почта должна быть строковой'})
    @IsEmail({}, {message: 'Почта имеет неправильный вид!'})
    email: string;

    @ApiProperty({example: '1234567890', required: true, description: 'Пароль пользователя'})
    @IsString({message: 'Пароль должен быть строковым'})
    @Length(6, 20, {message: 'Длина должна быть от 6 до 20 символов'})
    password: string;
}