import {Column, HasMany, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Seamstress} from "../seamstress/seamstress.model";

interface OperationAttrs{
    name: String;

    price: Number;
}

@Table({
    tableName: 'operations',
    timestamps: false
})
export class Operation extends Model<Operation, OperationAttrs>{
    @Column({type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true})
    id: Number;

    @Column({type: DataTypes.STRING, allowNull: false})
    name: String;

    @Column({type: DataTypes.INTEGER, allowNull: false})
    price: Number;

    @HasMany(()=>Seamstress)
    seamstresses: Seamstress[]
}