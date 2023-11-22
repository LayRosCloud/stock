import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ModelEntity } from "src/models/models.model";
import {Price} from "../prices/prices.model";

export interface IModelPriceCreationAttrs{
    modelId: number;
    priceId: number
}

export const tableName: string = 'modelprices'
@Table({tableName: tableName, timestamps: false})
export class ModelPrice extends Model<ModelPrice, IModelPriceCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 1, description: 'id модели'})
    @ForeignKey(() => ModelEntity)
    @Column({type: DataType.INTEGER, allowNull: false})
    modelId: number;

    @ApiProperty({example: 1, description: 'id цены'})
    @ForeignKey(() => Price)
    @Column({type: DataType.INTEGER, allowNull: false})
    priceId: number

    @BelongsTo(()=> Price)
    price: Price;

    @BelongsTo(()=> ModelEntity, {onDelete: 'CASCADE'})
    model: Model;

}