import {IActionCreationAttrs} from "../action.model";
import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";


export class CreateActionDto implements IActionCreationAttrs{
    @ApiProperty({example: 'Добавление', description: 'Название действия'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 30, {message: 'От 1 до 30 символов'})
    name: string;

}