import { ApiProperty } from "@nestjs/swagger";
import { IPartyCreationAttrs } from "../parties.model";


export class CreatePartyDto implements IPartyCreationAttrs{
    @ApiProperty({example: 1, description: 'id модели'})
    modelId: number;

    @ApiProperty({example: 1, description: 'id личности, который начал партию'})
    personId: number;

    @ApiProperty({example: 1, description: 'Количество партий'})
    count: number;

    @ApiProperty({example: '2010-01-13', description: 'Дата начала партии'})
    dateStart: Date;

    @ApiProperty({example: 1, description: 'Номер крои'})
    cutNumber: number;

    @ApiProperty({example: 1, description: 'Размер выбранной модели'})
    sizeId: number;

}