import {IHistoryCreationAttrs} from "../histories.model";
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString, Length} from "class-validator";

export class CreateHistoryDto implements IHistoryCreationAttrs{

    constructor(actionId: number, personId: number, tableName: string, value: string) {
        this.actionId = actionId;
        this.personId = personId;
        this.tableName =  tableName;
        this.value = value;
    }


    @ApiProperty({example: 1, description: 'Тип действия'})
    @IsNumber({}, {message: 'Должно быть числом'})
    actionId: number;

    @ApiProperty({example: 1, description: 'Человек, который сделал действие'})
    @IsNumber({}, {message: 'Должно быть числом'})
    personId: number;

    @ApiProperty({example: 'persons', description: 'Тип действия'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 30,{message: 'Длина от 1 до 20 символов'})
    tableName: string;

    @ApiProperty({example: 'Добавил нового пользователя', description: 'Какое действие сделал'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 100,{message: 'Длина от 1 до 100 символов'})
    value: string;
}