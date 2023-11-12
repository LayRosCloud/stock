import { ApiProperty } from "@nestjs/swagger";
import { IModelCreationAttrs } from "../models.model";
import { IsNumber, IsString, Length } from "class-validator";


export class CreateModelDto implements IModelCreationAttrs{
    
    @ApiProperty({example: 'Треники', description: 'Название модели'})
    @IsString({message: 'Должен быть строкой'})
    @Length(1, 30, {message: 'От 1 до 30 символов'})
    readonly title: string;

    @ApiProperty({example: 'Ш230123', description: 'Артикул модели'})
    @IsString({message: 'Должен быть строкой'})
    @Length(1, 255, {message: 'От 1 до 30 символов'})
    readonly codeVendor: string;

    @ApiProperty({example: 100, description: 'Цена'})
    @IsNumber({}, {message: 'Должен быть числом'})
    readonly priceId: number;

}