import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, HasMany } from "sequelize-typescript";
import { ClothOperation } from "src/clothoperations/clothoperations.model";
import { Operation } from "src/operations/operations.model";
import {ModelEntity} from "../models/models.model";

export interface IPriceCreationAttrs{
    number: number;
}
export const tableName: string = 'prices';
@Table({tableName: 'prices', updatedAt: false, createdAt: 'date'})
export class Price extends Model<Price, IPriceCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 123.21, description: 'Значение цены'})
    @Column({type: DataType.FLOAT, allowNull: false})
    number: number;

    @HasMany(()=>ClothOperation)
    clothOperations: ClothOperation[];

    @HasMany(()=>ModelEntity)
    models: ModelEntity[];
}