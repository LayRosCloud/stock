import {ApiProperty} from "@nestjs/swagger";
import {IPackageCreationAttrs} from "../packages.model";
import {IsNumber, IsString, Length} from "class-validator";

export class CreatePackageDto implements IPackageCreationAttrs{
    @ApiProperty({example: 1, description: 'Кто добавил пачку'})
    @IsNumber({},{message: 'Должно быть числом'})
    personId: number

    @ApiProperty({example: 1, description: 'Количество в пачке'})
    @IsNumber({},{message: 'Должно быть числом'})
    count: number;

    @ApiProperty({example: 1, description: 'Пачка к какой крое относится'})
    @IsNumber({},{message: 'Должно быть числом'})
    partyId: number;

    @ApiProperty({example: 1, description: 'Размер выбранной модели'})
    @IsNumber({},{message: 'Должно быть числом'})
    sizeId: number;

    @ApiProperty({example: 'O', description: 'Артикул пачки'})
    @IsString({message: 'Должна быть строкой'})
    @Length(1, 10, {message: 'От 1 до 10 символов'})
    uid: string;

    @ApiProperty({example: 1, description: 'Цвет пачки'})
    @IsNumber({},{message: 'Должно быть числом'})
    colorId: number;

    @ApiProperty({example: 1, description: 'Материал пачки'})
    @IsNumber({},{message: 'Должно быть числом'})
    materialId: number;
}