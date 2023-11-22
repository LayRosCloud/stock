import { ApiProperty } from "@nestjs/swagger";
import {Model, DataType, Column, Table, BelongsToMany, HasMany, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Party } from "src/parties/parties.model";
import {ModelOperation} from "../modeloperations/entities/modeloperation.entity";
import {Operation} from "../operations/operations.model";
import {Price} from "../prices/prices.model";
import {ModelPrice} from "../modelprices/modelprices.model";
//import {ModelPrice} from "../modelprices/entities/modelprice.entity";

export interface IModelCreationAttrs{
    title: string;
    codeVendor: string;
}

export const tableName: string = 'models'

@Table({timestamps: false, tableName: tableName})
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

    @HasMany(()=>Party)
    parties: Party[]

    @BelongsToMany (()=> Price, ()=>ModelPrice)
    prices: Price[];

    @BelongsToMany(() => Operation, () => ModelOperation)
    operations: Operation[]
}