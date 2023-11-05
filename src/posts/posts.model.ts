import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, BelongsToMany } from "sequelize-typescript";
import { Permission } from "src/permissions/permissions.model";
import { Person } from "src/persons/persons.model";

export interface IPostCreationAttrs{
    name: string;
    description: string;
}
export const tableName: string = 'posts';
@Table({tableName: tableName, timestamps: false})
export default class Post extends Model<Post, IPostCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Директор', description: 'Название должности'})
    @Column({type: DataType.STRING(30), allowNull: false, unique: true})
    name: string;

    @ApiProperty({example: 'Человек, который стоит во главе организации', description: 'Описание должности'})
    @Column({type: DataType.STRING(255), allowNull: false})
    description: string;

    @BelongsToMany(()=>Person, ()=>Permission)
    persons: Person[]
}