import { ApiProperty } from "@nestjs/swagger";
import {Model, DataType, Column, Table, ForeignKey, BelongsTo} from "sequelize-typescript";
import { ModelEntity } from "src/models/models.model";
import { Size } from "src/sizes/sizes.model";

export interface IModelSizeCreationAttrs{
    modelId: number;
    sizeId: number;
}
export const tableName: string = 'modelsizes'
@Table({tableName: tableName, timestamps: false})
export class ModelSize extends Model<ModelSize, IModelSizeCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 1, description: 'id модели'})
    @ForeignKey(() => ModelEntity)
    @Column({type: DataType.INTEGER, allowNull: false})
    modelId: number;

    @ApiProperty({example: 1, description: 'id размера'})
    @ForeignKey(() => Size)
    @Column({type: DataType.INTEGER, allowNull: false})
    sizeId: number;

    @BelongsTo(()=> ModelEntity, {onDelete: 'CASCADE'})
    model: ModelEntity

    @BelongsTo(()=> Size)
    size: Size
}