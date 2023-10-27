import { ApiProperty } from "@nestjs/swagger";
import { ISizeCreationAttrs } from "../sizes.model";


export class CreateSizeDto implements ISizeCreationAttrs{
    @ApiProperty({example: 'XS', description: 'Американское наименование размера'})
    name: string;

    @ApiProperty({example: '50-55', description: 'Цифровой эквивалент'})
    number: string;

    @ApiProperty({example: 1, description: 'К какой категории возраста относится'})
    ageId: number;
}