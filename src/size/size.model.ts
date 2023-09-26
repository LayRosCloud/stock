import {Column, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Age} from "../age/age.model";
import {Models} from "../model/model.model";

interface SizeAttrs{
    name: string;

    EUR: Number;

    RUS: Number;

    ageId: Number;
}

@Table({
    tableName: 'sizes',
    timestamps: false
})
export class Size extends Model<Size, SizeAttrs>{
    @Column({type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true})
    id: Number;

    @Column({type: DataTypes.STRING(8), allowNull: false})
    name: String

    @Column({type: DataTypes.INTEGER, allowNull: false})
    EUR: Number

    @Column({type: DataTypes.INTEGER, allowNull: false})
    RUS: Number

    @ForeignKey(() => Age)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    ageId: Number

    @HasMany(()=>Models)
    models: Models[]
}