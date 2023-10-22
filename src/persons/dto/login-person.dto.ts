import {ApiProperty} from "@nestjs/swagger";


export class LoginPersonDto{
    @ApiProperty({example: 'example@example.com', required: true, description: 'Почта пользователя'})
    email: string;

    @ApiProperty({example: '1234567890', required: true, description: 'Пароль пользователя'})
    password: string;
}