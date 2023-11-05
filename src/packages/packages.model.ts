import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {Size} from "../sizes/sizes.model";
import {Party} from "../parties/parties.model";
import {Person} from "../persons/persons.model";
import {Material} from "../materials/materials.model";
import {Color} from "../colors/colors.model";

export interface IPackageCreationAttrs{
    personId:number;
    partyId: number;
    sizeId: number;
    count: number;
    uid: string
    colorId: number;
    materialId: number;
}

export const tableName: string = 'packages'

@Table({tableName: tableName, updatedAt: false})
export class Package extends Model<Package, IPackageCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 1, description: 'Кто добавил пачку'})
    @ForeignKey(()=> Person)
    @Column({type: DataType.INTEGER, allowNull: false})
    personId: number

    @ApiProperty({example: 1, description: 'Пачка к какой крое относится'})
    @ForeignKey(()=> Party)
    @Column({type: DataType.INTEGER, allowNull: false})
    partyId: number

    @ApiProperty({example: 1, description: 'Размер выбранной модели'})
    @ForeignKey(()=> Size)
    @Column({type: DataType.INTEGER, allowNull: false})
    sizeId: number

    @ApiProperty({example: 1, description: 'Количество пачек'})
    @Column({type: DataType.INTEGER, allowNull: false})
    count: number;

    @ApiProperty({example: 1, description: 'Материал пачки'})
    @ForeignKey(()=> Material)
    @Column({type: DataType.INTEGER, allowNull: false})
    materialId: number

    @ApiProperty({example: 1, description: 'Цвет пачки'})
    @ForeignKey(()=> Color)
    @Column({type: DataType.INTEGER, allowNull: false})
    colorId: number

    @ApiProperty({example: false, description: 'Закончены ли операции над пачкой'})
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: '0'})
    isEnded: boolean;

    @ApiProperty({example: false, description: 'Закончены ли операции над пачкой'})
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: '0'})
    isRepeat: boolean;

    @ApiProperty({example: 'DF', description: 'Артикул пачки'})
    @Column({type: DataType.STRING(10), allowNull: false})
    uid: string;

    @BelongsTo(()=> Size)
    size: Size;

    @BelongsTo(()=> Party)
    party: Party;

    @BelongsTo(()=> Person)
    person: Person;

    @BelongsTo(()=> Color)
    color: Color;

    @BelongsTo(()=> Material)
    material: Material;
}