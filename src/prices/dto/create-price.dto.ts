import { ApiProperty } from "@nestjs/swagger";
import { IPriceCreationAttrs } from "../prices.model";


export class CreatePriceDto implements IPriceCreationAttrs{
    @ApiProperty({example: 123.21, description: 'Значение цены'})
    number: number;
}