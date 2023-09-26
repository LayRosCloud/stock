import {Column, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {Post} from "../posts/posts.model";
import {Cutter} from "../cutter/cutter.model";
import {Seamstress} from "../seamstress/seamstress.model";

interface WorkingPersonAttrs{
    lastname: string;
    name: string;
    postId: number;
}
@Table({
    tableName: 'workingPersons',
    timestamps: false
})
export class WorkingPerson extends Model<WorkingPerson, WorkingPersonAttrs>{
    @Column({type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true})
    id: Number;

    @Column({type: DataTypes.STRING(50), allowNull: false})
    lastname: string

    @Column({type: DataTypes.STRING(40), allowNull: false})
    name: string;

    @Column({type: DataTypes.STRING(40), allowNull: true})
    patronymic: string;

    @ForeignKey(()=>Post)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    postId: number;

    @HasOne(() => Cutter)
    cutter: Cutter

    @HasMany(()=>Seamstress)
    seamstresses: Seamstress[]
}