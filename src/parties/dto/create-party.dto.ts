import { ApiProperty } from "@nestjs/swagger";
import { IPartyCreationAttrs } from "../parties.model";
import {IsDateString, IsNumber, IsString, Length} from "class-validator";


export class CreatePartyDto implements IPartyCreationAttrs{
    @ApiProperty({example: 1, description: 'id модели'})
    @IsNumber({},{message: 'Должно быть числом'})
    modelId: number;

    @ApiProperty({example: 1, description: 'id личности, который начал партию'})
    @IsNumber({},{message: 'Должно быть числом'})
    personId: number;

    @ApiProperty({example: '2010-01-13', description: 'Дата начала партии'})
    @IsDateString({},{message: 'Должно быть датой'})
    dateStart: Date;

    @ApiProperty({example: '2010-01-13', description: 'Дата начала партии'})
    dateEnd: Date;

    @ApiProperty({example: 1, description: 'Номер крои'})
    @IsString({message: 'Должно быть строкой'})
    @Length(1, 10, {message: "От 1 до 10 символов"})
    cutNumber: string;

    @ApiProperty({example: 1, description: 'id цены модели'})
    @IsNumber({},{message: 'Должно быть числом'})
    priceId: number;
}