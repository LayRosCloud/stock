import {ApiProperty} from "@nestjs/swagger";
import {IPackageCreationAttrs} from "../packages.model";

export class CreatePackageDto implements IPackageCreationAttrs{
    @ApiProperty({example: 1, description: 'Количество партий'})
    count: number;

    @ApiProperty({example: 1, description: 'Пачка к какой крое относится'})
    partyId: number;

    @ApiProperty({example: 1, description: 'Размер выбранной модели'})
    sizeId: number;
}