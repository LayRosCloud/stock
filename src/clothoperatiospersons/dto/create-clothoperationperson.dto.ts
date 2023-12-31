import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsNumber} from "class-validator";
import {IClothOperationPersonsCreationAttrs} from "../clothoperatiospersons.model";


export class CreateClothoperationpersonDto implements IClothOperationPersonsCreationAttrs{
    @ApiProperty({example: '0', description: 'Закончена ли операция'})
    @IsNumber({},{message: 'Должно быть булевым'})
    clothOperationId: number;

    @ApiProperty({example: '2010-10-10', description: 'Дата начала операции'})
    @IsDateString({},{message: 'Должно быть число'})
    dateStart: Date;

    @ApiProperty({example: 1, description: 'Id человека'})
    @IsNumber({},{message: 'Должно быть число'})
    personId: number;
}