import { ApiProperty } from "@nestjs/swagger";
import { IClothOperationCreationAttrs } from "../clothoperations.model";


export class CreateClothOperationDto implements IClothOperationCreationAttrs{
    @ApiProperty({example: 1, description: 'Id операции'})
    operationId: number;

    @ApiProperty({example: 1, description: 'Id партии'})
    partyId: number;

    @ApiProperty({example: 1, description: 'Id человека'})
    personId: number;
    
    @ApiProperty({example: 1, description: 'Id зафиксированной цены в данный момент у операции'})
    priceId: number;
    
}