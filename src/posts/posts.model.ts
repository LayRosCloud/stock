import {Column, HasMany, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import {WorkingPerson} from "../working-person/working-person.model";

interface PostAttrs{
    name: string;
    description: string;
}

@Table({
    tableName: 'posts',
    timestamps: false
})
export class Post extends Model<Post, PostAttrs>{
    @Column({type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true})
    id: Number;

    @Column({type: DataTypes.STRING(30), allowNull: false})
    name: string

    @Column({type: DataTypes.STRING(255), allowNull: false})
    description: string;

    @HasMany(() => WorkingPerson)
    workingPersons: WorkingPerson[];
}