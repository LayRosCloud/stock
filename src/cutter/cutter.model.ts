import {Column, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {WorkingPerson} from "../working-person/working-person.model";
import {Cut} from "../cut/cut.model";

interface CutterAttrs{
    modelId: Number;

    cutterId: Number;

    count: Number;

    date: Date;

    isDefected: boolean;
}

@Table({
    tableName: 'cutters',
    timestamps: false
})
export class Cutter extends Model<Cutter, CutterAttrs>{
    @Column({type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true})
    id: Number;

    @ForeignKey(() => WorkingPerson)
    @Column({type: DataTypes.INTEGER, allowNull: false, unique: true})
    workingPersonId: Number

    @Column({type: DataTypes.CHAR(3), allowNull: false})
    uniqueSymbol: String

    @HasMany(() => Cut)
    cuts: Cut[]
}