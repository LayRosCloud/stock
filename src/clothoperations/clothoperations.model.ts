import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Operation } from "src/operations/operations.model";
import { Person } from "src/persons/persons.model";
import { Price } from "src/prices/prices.model";
import {Package} from "../packages/packages.model";

export interface IClothOperationCreationAttrs{
    operationId: number;
    packageId: number;
    personId: number;
    priceId: number;
    dateStart: Date;
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

    @ApiProperty({example: 1, description: 'Id человека'})
    @ForeignKey(()=>Person)
    @Column({type: DataType.INTEGER, allowNull: false})
    personId: number;

    @ApiProperty({example: 1, description: 'Id зафиксированной цены в данный момент у операции'})
    @ForeignKey(() => Price)
    @Column({type: DataType.INTEGER, allowNull: false})
    priceId: number;

    @ApiProperty({example: '2010-10-10', description: 'Дата начала операции'})
    @Column({type: DataType.DATE, allowNull: false})
    dateStart: Date;

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: '0'})
    isEnded: boolean;

    @BelongsTo(()=> Operation)
    operation: Operation;

    @BelongsTo(()=> Package)
    package: Package;

    @BelongsTo(()=> Person)
    person: Person;

    @BelongsTo(()=> Price)
    price: Price;
}