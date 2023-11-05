import { ApiProperty } from "@nestjs/swagger";
import {Model, DataType, Column, Table, HasMany} from "sequelize-typescript";
import {Package} from "../packages/packages.model";

export interface IColorsCreationAttrs{
    name: string;
    uid: string;
}
export const tableName: string = 'colors'
@Table({tableName: tableName, timestamps: false})
export class Color extends Model<Color, IColorsCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 'Красный', description: 'Название цвета'})
    @Column({type: DataType.STRING(30), allowNull: false})
    name: string;

    @ApiProperty({example: 'R', description: 'Артикул цвета'})
    @Column({type: DataType.STRING(5), allowNull: false})
    uid: string;

    @HasMany(()=>Package)
    packages: Package[]
}