import {IMaterialCreationAttrs} from "../materials.model";
import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";


export class CreateMaterialDto implements IMaterialCreationAttrs{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 30, {message: 'От 1 до 30 символов'})
    name: string;

    @ApiProperty({example: 'Кожа выполненая из африканских самцов', description: 'Описание материала'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 255, {message: 'От 1 до 255 символов'})
    description: string;

    @ApiProperty({example: 'KK', description: 'Артикул материала'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 10, {message: 'От 1 до 10 символов'})
    uid: string;

}