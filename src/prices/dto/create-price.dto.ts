import { ApiProperty } from "@nestjs/swagger";
import { IPriceCreationAttrs } from "../prices.model";
import { IsNumber } from "class-validator";


export class CreatePriceDto implements IPriceCreationAttrs{
    @ApiProperty({example: 123.21, description: 'Значение цены'})
    @IsNumber({},{message: 'Должно быть числом'})
    number: number;
}