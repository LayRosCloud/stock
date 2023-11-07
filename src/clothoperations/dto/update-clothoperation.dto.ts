import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsBoolean } from "class-validator";


export class UpdateClothOperationDto{
    @ApiProperty({example: 1, description: 'Id операции'})
    @IsNumber({},{message: 'Должно быть числом'})
    operationId: number;

    @ApiProperty({example: 1, description: 'Id партии'})
    @IsNumber({},{message: 'Должно быть числом'})
    packageId: number;
    
    @ApiProperty({example: 1, description: 'Id зафиксированной цены в данный момент у операции'})
    @IsNumber({},{message: 'Должно быть число'})
    priceId: number;

    @ApiProperty({example: false, description: 'Закончена ли операция'})
    @IsBoolean({message: 'Должно быть булевым'})
    isEnded: boolean
}