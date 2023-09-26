import {Column, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Models} from "../model/model.model";
import {Cutter} from "../cutter/cutter.model";
import {Seamstress} from "../seamstress/seamstress.model";

interface CutAttrs{
    modelId: Number;

    cutterId: Number;

    count: Number;

    date: Date;

    isDefected: boolean;
}

@Table({
    tableName: 'cuts',
    timestamps: false
})
export class Cut extends Model<Cut, CutAttrs>{
    @Column({type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true})
    id: Number;

    @ForeignKey(() => Models)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    modelId: Number

    @ForeignKey(() => Cutter)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    cutterId: Number

    @Column({type: DataTypes.INTEGER, allowNull: false})
    count: Number

    @Column({type: DataTypes.DATEONLY, allowNull: false})
    date: Date

    @Column({type: DataTypes.BOOLEAN, allowNull: false})
    isDefected: boolean

    @HasMany(()=>Seamstress)
    seamstresses: Seamstress[]
}