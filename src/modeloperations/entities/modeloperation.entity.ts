import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {ModelEntity} from "../../models/models.model";
import {Operation} from "../../operations/operations.model"

export interface IModelOperationCreationAttrs{
    modelId: number;
    operationId: number;
}
export const tableName: string = 'modeloperations'
@Table({tableName: tableName, timestamps: false})
export class ModelOperation extends Model<ModelOperation, IModelOperationCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 1, description: 'id модели'})
    @ForeignKey(() => ModelEntity)
    @Column({type: DataType.INTEGER, allowNull: false})
    modelId: number;

    @ApiProperty({example: 1, description: 'id операции'})
    @ForeignKey(() => Operation)
    @Column({type: DataType.INTEGER, allowNull: false})
    operationId: number;

    @BelongsTo(()=> ModelEntity, {onDelete: 'CASCADE'})
    model: ModelEntity

    @BelongsTo(()=> Operation)
    operation: Operation
}
