import { ApiProperty } from "@nestjs/swagger";
import { IClothOperationCreationAttrs } from "../clothoperations.model";


export class CreateClothOperationDto implements IClothOperationCreationAttrs{
    @ApiProperty({example: 1, description: 'Id операции'})
    operationId: number;

    @ApiProperty({example: 1, description: 'Id партии'})
    packageId: number;

    @ApiProperty({example: 1, description: 'Id человека'})
    personId: number;
    
    @ApiProperty({example: 1, description: 'Id зафиксированной цены в данный момент у операции'})
    priceId: number;

    @ApiProperty({example: '2010-10-10', description: 'Дата начала операции'})
    dateStart: Date;
}