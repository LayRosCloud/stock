import { ApiProperty } from "@nestjs/swagger";
import {Model, DataType, Column, Table, HasMany} from "sequelize-typescript";
import {Package} from "../packages/packages.model";

export interface IMaterialCreationAttrs{
    name: string,
    description: string;
    uid: string;
}

export const tableName: string = 'materials'

@Table({tableName: tableName, timestamps: false})
export class Material extends Model<Material, IMaterialCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 'Кожа крокодила', description: 'Название материала'})
    @Column({type: DataType.STRING(30), allowNull: false})
    name: string;

    @ApiProperty({example: 'Кожа выполненая из африканских самцов', description: 'Описание материала'})
    @Column({type: DataType.STRING(255), allowNull: false})
    description: string;

    @ApiProperty({example: 'KK', description: 'Артикул материала'})
    @Column({type: DataType.STRING(10), allowNull: false})
    uid: string;

    @HasMany(()=>Package)
    packages: Package[]
}