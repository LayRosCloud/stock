import { ApiProperty } from "@nestjs/swagger";
import { IOperationCreationAttrs } from "../operations.model";
import { IsNumber, IsString, Length } from "class-validator";


export class CreateOperationDto implements IOperationCreationAttrs{
    @ApiProperty({example: 'Overlock', description: 'Название операции'})
    @IsString({message: 'Должна быть строкой'})
    @Length(1, 30, {message: 'От 1 до 30 символов'})
    name: string;

    @ApiProperty({example: 'Вид строчки для изделий', description: 'Описание операции'})
    @IsString({message: 'Должна быть строкой'})
    @Length(1, 255, {message: 'От 1 до 255 символов'})
    description: string;

    @ApiProperty({example: 'Over', description: 'Артикул операции'})
    @IsString({message: 'Должна быть строкой'})
    @Length(1, 5, {message: 'От 1 до 5 символов'})
    uid: string;

    @ApiProperty({example: 20.1, description: 'Процент от модели'})
    @IsNumber({}, {message: 'Должен быть числом'})
    percent: number;
    
}