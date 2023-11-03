import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNumber } from "class-validator";


export class UpdatePartyDto{
    @ApiProperty({example: 1, description: 'id модели'})
    @IsNumber({},{message: 'Должно быть числом'})
    modelId: number;

    @ApiProperty({example: 1, description: 'id личности, который начал партию'})
    @IsNumber({},{message: 'Должно быть числом'})
    personId: number;

    @ApiProperty({example: '2010-01-13', description: 'Дата начала партии'})
    @IsDateString({},{message: 'Должно быть датой'})
    dateStart: Date;

    @ApiProperty({example: '2010-01-13', description: 'Дата конца партии'})
    @IsDateString({},{message: 'Должно быть датой'})
    dateEnd: Date;

    @ApiProperty({example: 1, description: 'Номер крои'})
    @IsNumber({},{message: 'Должно быть числом'})
    cutNumber: number;
}