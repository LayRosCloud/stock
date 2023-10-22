import { ApiProperty } from "@nestjs/swagger";
import { IPersonCreationAttrs } from "../persons.model";

export class CreatePersonDto implements IPersonCreationAttrs{
    @ApiProperty({example: 'example@example.com', required: true, description: 'Почта пользователя'})
    readonly email: string;

    @ApiProperty({example: '1234567890', required: true, description: 'Пароль пользователя'})
    password: string;

    @ApiProperty({example: 'Иванов', required: true, description: 'Фамилия пользователя'})
    readonly lastName: string;

    @ApiProperty({example: 'Иван', required: true, description: 'Имя пользователя'})
    readonly firstName: string;

    @ApiProperty({example: 'Иванович', required: false, description: 'Отчество пользователя'})
    patronymic: string;

    @ApiProperty({example: '1987-01-01', required: true, description: 'День рождения пользователя'})
    readonly birthDay: Date;

    @ApiProperty({example: 'ivan', required: true, description: 'Уникальные символы пользователя'})
    readonly uid: string;
}