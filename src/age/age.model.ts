import {Column, HasMany, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Size} from "../size/size.model";

interface AgeAttrs{
    name: number;
}

@Table({
    tableName: 'ages',
    timestamps: false
})
export class Age extends Model<Age, AgeAttrs>{
    @Column({type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true})
    id: Number;

    @Column({type: DataTypes.STRING(40), allowNull: false})
    name: string

    @HasMany(() => Size)
    sizes: Size[]
}