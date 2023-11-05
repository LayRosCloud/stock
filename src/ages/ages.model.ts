import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, HasMany } from "sequelize-typescript";
import { Size } from "src/sizes/sizes.model";

export interface IAgeCreationAttrs{
    name: string;
    description: string;
}
export const tableName: string = 'ages'
@Table({tableName: tableName, timestamps: false})
export class Age extends Model<Age, IAgeCreationAttrs>{
    @ApiProperty({example: 1, description: 'Универсальный идентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 'Взрослые мужчины', description: 'Наименование возрастной группы'})
    @Column({type: DataType.STRING(30), allowNull: false})
    name: string;

    @ApiProperty({example: 'Люди от 18 до 99+ лет', description: 'Описание возрастной группы'})
    @Column({type: DataType.STRING(255), allowNull: false})
    description: string;

    @HasMany(()=>Size)
    sizes: Size[]
}