import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, BelongsTo, BelongsToMany, ForeignKey, HasMany } from "sequelize-typescript";
import { Age } from "src/ages/ages.model";
import { ModelEntity } from "src/models/models.model";
import { ModelSize } from "src/modelsizes/modelsizes.model";
import { Party } from "src/parties/parties.model";

export interface ISizeCreationAttrs{
    name: string;
    number: number;
    ageId: number;
}

@Table({tableName: 'sizes', timestamps: false})
export class Size extends Model<Size, ISizeCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 'XS', description: 'Американское наименование размера'})
    @Column({type: DataType.STRING(5), allowNull: false, unique: true})
    name: string;

    @ApiProperty({example: 50, description: 'Цифровой эквивалент'})
    @Column({type: DataType.INTEGER, allowNull: false})
    number: number;

    @ApiProperty({example: 1, description: 'К какой категории возраста относится'})
    @ForeignKey(()=> Age)
    @Column({type: DataType.INTEGER, allowNull: false})
    ageId: number;

    @BelongsTo(()=> Age)
    age: Age;

    @BelongsToMany(()=> ModelEntity, ()=> ModelSize)
    models: Model[];

    @HasMany(()=> Party)
    parties: Party[] 
}