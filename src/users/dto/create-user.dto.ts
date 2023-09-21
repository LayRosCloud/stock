import {ApiProperty} from "@nestjs/swagger";


export class CreateUserDto {
    @ApiProperty({example: 'example@gmail.com', description: 'Почта пользователя'})
    readonly email: string;

    @ApiProperty({example: '1234567890', description: 'Пароль пользователя'})
    readonly password: string;
}