import { ApiProperty } from "@nestjs/swagger";
import { IAgeCreationAttrs } from "../ages.model";


export class CreateAgeDto implements IAgeCreationAttrs{
    @ApiProperty({example: 'Взрослые мужчины', description: 'Наименование возрастной группы'})
    readonly name: string;

    @ApiProperty({example: 'Люди от 18 до 99+ лет', description: 'Описание возрастной группы'})
    readonly description: string;
}