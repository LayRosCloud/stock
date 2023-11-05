import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import { ClothOperation } from "src/clothoperations/clothoperations.model";
import { Price } from "src/prices/prices.model";

export interface IOperationCreationAttrs{
    name: string;
    description: string;
    priceId: number;
    uid: string
}
export const tableName: string = 'operations'
@Table({tableName: tableName, timestamps: false})
export class Operation extends Model<Operation, IOperationCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 'Over', description: 'Артикул операции'})
    @Column({type: DataType.STRING(5), allowNull: false})
    uid: string;

    @ApiProperty({example: 'Overlock', description: 'Название операции'})
    @Column({type: DataType.STRING(30), allowNull: false})
    name: string;

    @ApiProperty({example: 'Вид строчки для изделий', description: 'Описание операции'})
    @Column({type: DataType.STRING(255), allowNull: false})
    description: string;

    @ApiProperty({example: 1, description: 'Цена операции на текущий момент'})
    @ForeignKey(()=> Price)
    @Column({type: DataType.INTEGER, allowNull: false})
    priceId: number;

    @BelongsTo(()=> Price)
    price: Price;

    @HasMany(()=>ClothOperation)
    clothOperations: ClothOperation[];
}