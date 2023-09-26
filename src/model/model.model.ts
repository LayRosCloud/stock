import {Column, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Size} from "../size/size.model";
import {Cutter} from "../cutter/cutter.model";
import {Cut} from "../cut/cut.model";

interface ModelAttrs{
    vendorCode: Number;

    name: String;

    sizeId: Number;

    percent: Number;

    cutterId: Number
}

@Table({
    tableName: 'models',
    timestamps: false
})
export class Models extends Model<Models, ModelAttrs>{
    @Column({type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true})
    id: Number;

    @Column({type: DataTypes.INTEGER, allowNull: false})
    vendorCode: Number;

    @Column({type: DataTypes.STRING(100), allowNull: false})
    name: String;

    @ForeignKey(() => Cutter)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    cutterId: Number;

    @ForeignKey(() => Size)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    sizeId: Number;

    @Column({type: DataTypes.INTEGER, allowNull: false})
    percent: Number;

    @HasMany(() => Cut)
    cuts: Cut[]
}