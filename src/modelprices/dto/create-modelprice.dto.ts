import {IModelPriceCreationAttrs} from "../modelprices.model";
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";


export class CreateModelpriceDto implements IModelPriceCreationAttrs{
    @ApiProperty({example: 1, description: 'id модели'})
    @IsNumber({}, {message: 'Должно быть числом'})
    modelId: number;

    @ApiProperty({example: 1, description: 'id цены'})
    @IsNumber({}, {message: 'Должно быть числом'})
    priceId: number;

}