import { ApiProperty } from "@nestjs/swagger";
import {Model, DataType, Column, Table, HasMany} from "sequelize-typescript";
import {History} from "../histories/histories.model";

export interface IActionCreationAttrs{
    name: string,
}

export enum Actions{
    READ = 1,
    POST = 2,
    UPDATE = 3,
    DELETE = 4
}
export const tableName: string = 'actions'
@Table({tableName: tableName, timestamps: false})
export class Action extends Model<Action, IActionCreationAttrs>{

    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 'Добавление', description: 'Название действия'})
    @Column({type: DataType.STRING(30), allowNull: false})
    name: string;

    @HasMany(()=>History)
    histories: History[]
}