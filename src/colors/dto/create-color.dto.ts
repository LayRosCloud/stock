import {IColorsCreationAttrs} from "../colors.model";
import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";


export class CreateColorDto implements IColorsCreationAttrs{
    @ApiProperty({example: 'Красный', description: 'Название цвета'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 30, {message: 'От 1 до 30 символов'})
    name: string;

    @ApiProperty({example: 'R', description: 'Артикул цвета'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 5, {message: 'От 1 до 10 символов'})
    uid: string;
}