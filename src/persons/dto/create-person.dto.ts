import { ApiProperty } from "@nestjs/swagger";
import { IPersonCreationAttrs } from "../persons.model";
import { IsDateString, IsEmail, IsString, Length } from "class-validator";

export class CreatePersonDto implements IPersonCreationAttrs{
    @ApiProperty({example: 'example@example.com', required: true, description: 'Почта пользователя'})
    @IsString({message: 'Почта должна быть строковой'})
    @IsEmail({}, {message: 'Почта имеет неправильный вид!'})
    readonly email: string;

    @ApiProperty({example: '1234567890', required: true, description: 'Пароль пользователя'})
    @IsString({message: 'Пароль должен быть строковым'})
    @Length(6, 20, {message: 'Длина должна быть от 6 до 20 символов'})
    password: string;

    @ApiProperty({example: 'Иванов', required: true, description: 'Фамилия пользователя'})
    @IsString({message: 'Фамилия должна быть строковой'})
    @Length(1, 40, {message: 'От 1 до 40 символов'})
    readonly lastName: string;

    @ApiProperty({example: 'Иван', required: true, description: 'Имя пользователя'})
    @IsString({message: 'Имя должен быть строкой'})
    @Length(1, 40, {message: 'От 1 до 40 символов'})
    readonly firstName: string;

    @ApiProperty({example: 'Иванович', required: false, description: 'Отчество пользователя'})
    @IsString({message: 'Отчество должно быть строкой'})
    @Length(0, 50, {message: 'От 0 до 50 символов'})
    patronymic: string;

    @ApiProperty({example: '1987-01-01', required: true, description: 'День рождения пользователя'})
    @IsDateString({},{message: 'День рождение быть датой'})
    readonly birthDay: Date;

    @ApiProperty({example: 'ivan', required: true, description: 'Уникальные символы пользователя'})
    @IsString({message: 'Uid должно быть строкой'})
    @Length(1, 20, {message: 'От 1 до 20 символов'})
    readonly uid: string;
}