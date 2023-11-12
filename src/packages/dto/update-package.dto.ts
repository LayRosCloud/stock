import {IPackageCreationAttrs} from "../packages.model";
import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber} from "class-validator";

export class UpdatePackageDto implements IPackageCreationAttrs{
    @ApiProperty({example: 1, description: 'Кто добавил пачку'})
    @IsNumber({},{message: 'Должно быть числом'})
    personId: number;

    @ApiProperty({example: 1, description: 'Количество в пачке'})
    @IsNumber({},{message: 'Должно быть числом'})
    count: number;

    @ApiProperty({example: 1, description: 'Пачка к какой крое относится'})
    @IsNumber({},{message: 'Должно быть числом'})
    partyId: number;

    @ApiProperty({example: 1, description: 'Размер выбранной модели'})
    @IsNumber({},{message: 'Должно быть числом'})
    sizeId: number;

    @ApiProperty({example: false, description: 'Закончены ли операции над пачкой'})
    @IsBoolean({message: 'Должно быть булевым'})
    isEnded: boolean;

    @ApiProperty({example: false, description: 'Обновлена ли пачка'})
    @IsBoolean({message: 'Должно быть булевым'})
    isUpdated: boolean;

    @ApiProperty({example: false, description: 'Повторная ли это пачка'})
    @IsBoolean({message: 'Должно быть булевым'})
    isRepeat: boolean;

    @ApiProperty({example: 1, description: 'Материал пачки'})
    @IsNumber({},{message: 'Должно быть числом'})
    materialId: number;
}