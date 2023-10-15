import { ApiProperty } from "@nestjs/swagger";
import { IModelCreationAttrs } from "../models.model";


export class CreateModelDto implements IModelCreationAttrs{
    
    @ApiProperty({example: 'Треники', description: 'Название модели'})
    readonly title: string;

    @ApiProperty({example: 'Штаны с резинкой на ступнях', description: 'Описание модели'})
    readonly description: string;

    @ApiProperty({example: 'Ш230123', description: 'Артикул модели'})
    readonly codeVendor: string;

    @ApiProperty({example: 100, description: 'Процент наценки'})
    readonly percent: number;

}