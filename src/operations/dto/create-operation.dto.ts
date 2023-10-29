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
    @Length(1, 30, {message: 'От 1 до 30 символов'})
    description: string;

    @ApiProperty({example: 1, description: 'Цена операции на текущий момент'})
    @IsNumber({}, {message: 'Должно быть числом'})
    priceId: number;
    
}