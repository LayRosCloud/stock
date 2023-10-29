import { ApiProperty } from "@nestjs/swagger";
import { IAgeCreationAttrs } from "../ages.model";
import { IsString, Length } from "class-validator";


export class CreateAgeDto implements IAgeCreationAttrs{
    @ApiProperty({example: 'Взрослые мужчины', description: 'Наименование возрастной группы'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 30, {message: 'От 1 до 30 символов'})
    readonly name: string;

    @ApiProperty({example: 'Люди от 18 до 99+ лет', description: 'Описание возрастной группы'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 255, {message: 'От 1 до 255 символов'})
    readonly description: string;
}