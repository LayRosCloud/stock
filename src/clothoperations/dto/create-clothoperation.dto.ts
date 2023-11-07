import { ApiProperty } from "@nestjs/swagger";
import { IClothOperationCreationAttrs } from "../clothoperations.model";
import { IsDateString, IsNumber } from "class-validator";


export class CreateClothOperationDto implements IClothOperationCreationAttrs{
    @ApiProperty({example: 1, description: 'Id операции'})
    @IsNumber({},{message: 'Должно быть числом'})
    operationId: number;

    @ApiProperty({example: 1, description: 'Id партии'})
    @IsNumber({},{message: 'Должно быть числом'})
    packageId: number;

    @ApiProperty({example: 1, description: 'Id зафиксированной цены в данный момент у операции'})
    @IsNumber({},{message: 'Должно быть число'})
    priceId: number;
}