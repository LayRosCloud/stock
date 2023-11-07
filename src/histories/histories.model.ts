import { ApiProperty } from "@nestjs/swagger";
import {Model, DataType, Column, Table, ForeignKey, BelongsTo} from "sequelize-typescript";
import {Person} from "../persons/persons.model";
import {Action} from "../actions/action.model";

export interface IHistoryCreationAttrs{
    personId: number,
    actionId: number;
    tableName: string;
    value: string;
}
export const tableName: string = 'histories'
@Table({tableName: tableName, updatedAt: false})
export class History extends Model<History, IHistoryCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 1, description: 'Человек, который сделал действие'})
    @ForeignKey(()=>Person)
    @Column({type: DataType.INTEGER, allowNull: false})
    personId: number;

    @ApiProperty({example: 1, description: 'Тип действия'})
    @ForeignKey(()=> Action)
    @Column({type: DataType.INTEGER, allowNull: false})
    actionId: number;

    @ApiProperty({example: 'persons', description: 'Тип действия'})
    @Column({type: DataType.STRING(30), allowNull: false})
    tableName: string;

    @ApiProperty({example: 'Добавил нового пользователя', description: 'Какое действие сделал'})
    @Column({type: DataType.STRING(100), allowNull: false})
    value: string;

    @BelongsTo(()=> Person)
    person: Person;

    @BelongsTo(()=> Action)
    action: Action;
}