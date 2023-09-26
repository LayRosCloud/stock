import {Column, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {WorkingPerson} from "../working-person/working-person.model";
import {Operation} from "../operation/operation.model";
import {Cut} from "../cut/cut.model";

interface SeamstressAttrs{
    cutId: Number;

    workingPersonId: Number;

    operationId: Number;
}

@Table({
    tableName: 'seamstresses',
    timestamps: false
})
export class Seamstress extends Model<Seamstress, SeamstressAttrs>{
    @Column({type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true})
    id: Number;

    @ForeignKey(() => Cut)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    cutId: Number

    @ForeignKey(() => WorkingPerson)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    workingPersonId: Number;

    @ForeignKey(() => Operation)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    operationId: Number;
}