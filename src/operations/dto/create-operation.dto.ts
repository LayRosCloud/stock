import { ApiProperty } from "@nestjs/swagger";
import { IOperationCreationAttrs } from "../operations.model";


export class CreateOperationDto implements IOperationCreationAttrs{
    @ApiProperty({example: 'Overlock', description: 'Название операции'})
    name: string;

    @ApiProperty({example: 'Вид строчки для изделий', description: 'Описание операции'})
    description: string;

    @ApiProperty({example: 1, description: 'Цена операции на текущий момент'})
    priceId: number;
    
}