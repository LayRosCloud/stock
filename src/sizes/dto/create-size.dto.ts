import { ApiProperty } from "@nestjs/swagger";
import { ISizeCreationAttrs } from "../sizes.model";
import { IsString, Length } from "class-validator";


export class CreateSizeDto implements ISizeCreationAttrs{
    @ApiProperty({example: 'XS', description: 'Американское наименование размера'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 5, {message: 'От 1 до 5 символов'})
    name: string;

    @ApiProperty({example: '50-55', description: 'Цифровой эквивалент'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 10, {message: 'От 1 до 10 символов'})
    number: string;

    @ApiProperty({example: 1, description: 'К какой категории возраста относится'})
    ageId: number;
}