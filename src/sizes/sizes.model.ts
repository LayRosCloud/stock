import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Age } from "src/ages/ages.model";

export interface ISizeCreationAttrs{
    number: string;
    ageId: number;
}
export const tableName: string = 'sizes';
@Table({tableName: tableName, timestamps: false})
export class Size extends Model<Size, ISizeCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: '50-52', description: 'Цифровой эквивалент'})
    @Column({type: DataType.STRING(10), allowNull: false})
    number: string;

    @ApiProperty({example: 1, description: 'К какой категории возраста относится'})
    @ForeignKey(()=> Age)
    @Column({type: DataType.INTEGER, allowNull: false})
    ageId: number;

    @BelongsTo(()=> Age)
    age: Age;
}