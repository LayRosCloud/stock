import { ApiProperty } from "@nestjs/swagger";
import {Model, DataType, Column, Table, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import { Operation } from "src/operations/operations.model";
import { Price } from "src/prices/prices.model";
import {Package} from "../packages/packages.model";
import {ClothOperationPerson} from "../clothoperatiospersons/clothoperatiospersons.model";

export interface IClothOperationCreationAttrs{
    operationId: number;
    packageId: number;
    priceId: number;
}
export const tableName: string = 'clothoperations'
@Table({tableName: tableName, timestamps: false})
export class ClothOperation extends Model<ClothOperation, IClothOperationCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 1, description: 'Id операции'})
    @ForeignKey(() => Operation)
    @Column({type: DataType.INTEGER, allowNull: false})
    operationId: number;

    @ApiProperty({example: 1, description: 'Id партии'})
    @ForeignKey(() => Package)
    @Column({type: DataType.INTEGER, allowNull: false})
    packageId: number;

    @ApiProperty({example: 1, description: 'Id зафиксированной цены в данный момент у операции'})
    @ForeignKey(() => Price)
    @Column({type: DataType.INTEGER, allowNull: false})
    priceId: number;

    @ApiProperty({example: false, description: 'Закончена ли операция'})
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: '0'})
    isEnded: boolean;

    @BelongsTo(()=> Operation)
    operation: Operation;

    @BelongsTo(()=> Package)
    package: Package;

    @BelongsTo(()=> Price)
    price: Price;

    @HasMany(()=>ClothOperationPerson)
    clothOperationPersons: ClothOperationPerson[]
}