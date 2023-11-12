import { ApiProperty } from "@nestjs/swagger";
import {Model, DataType, Column, Table, BelongsToMany, HasMany, ForeignKey} from "sequelize-typescript";
import { Party } from "src/parties/parties.model";
import {ModelOperation} from "../modeloperations/entities/modeloperation.entity";
import {Operation} from "../operations/operations.model";
import {Price} from "../prices/prices.model";

export interface IModelCreationAttrs{
    title: string;
    codeVendor: string;
    priceId: number;
}

export const tableName: string = 'models'
@Table({tableName: tableName, timestamps: false})
export class ModelEntity extends Model<ModelEntity, IModelCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 'Треники', description: 'Полное название'})
    @Column({type: DataType.STRING(255), allowNull: false})
    title: string;

    @ApiProperty({example: 'Ш230123', description: 'Артикул модели'})
    @Column({type: DataType.STRING(30), allowNull: false})
    codeVendor: string;

    @ApiProperty({example: 100, description: 'цена'})
    @ForeignKey(()=>Price)
    @Column({type: DataType.INTEGER, allowNull: false})
    priceId: number;

    @HasMany(()=>Party)
    parties: Party[] 

    @BelongsToMany(() => Operation, () => ModelOperation)
    operations: Operation[]
}