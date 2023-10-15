import { ApiProperty } from "@nestjs/swagger";
import { IModelSizeCreationAttrs } from "../modelsizes.model";


export class CreateModelSizeDto implements IModelSizeCreationAttrs{
    @ApiProperty({example: 1, description: 'id модели'})
    modelId: number;

    @ApiProperty({example: 1, description: 'id размера'})
    sizeId: number;
}