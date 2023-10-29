import { ApiProperty } from "@nestjs/swagger";
import { IModelSizeCreationAttrs } from "../modelsizes.model";
import { IsNumber } from "class-validator";


export class CreateModelSizeDto implements IModelSizeCreationAttrs{
    @ApiProperty({example: 1, description: 'id модели'})
    @IsNumber({},{message: 'Должно быть числом'})
    modelId: number;

    @ApiProperty({example: 1, description: 'id размера'})
    @IsNumber({},{message: 'Должно быть числом'})
    sizeId: number;
}