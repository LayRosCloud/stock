import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { ModelEntity } from "src/models/models.model";
import { Person } from "src/persons/persons.model";
import {Package} from "../packages/packages.model";

export interface IPartyCreationAttrs{
    modelId: number;
    personId: number;
    dateStart: Date;
    cutNumber: number
}

export const tableName: string = 'parties'
@Table({tableName: tableName, timestamps: false})
export class Party extends Model<Party, IPartyCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 1, description: 'id модели'})
    @ForeignKey(() => ModelEntity)
    @Column({type: DataType.INTEGER, allowNull: false})
    modelId: number;

    @ApiProperty({example: 1, description: 'id личности, который начал партию'})
    @ForeignKey(() => Person)
    @Column({type: DataType.INTEGER, allowNull: false})
    personId: number;

    @ApiProperty({example: '2010-01-13', description: 'Дата начала партии'})
    @Column({type: DataType.DATEONLY, allowNull: false})
    dateStart: Date;

    @ApiProperty({example: '2010-02-13', description: 'Дата окончания партии'})
    @Column({type: DataType.DATEONLY, allowNull: true})
    dateEnd: Date;

    @ApiProperty({example: 1, description: 'Номер крои'})
    @Column({type: DataType.INTEGER, allowNull: false})
    cutNumber: number

    @BelongsTo(()=> Person)
    person: Person;

    @BelongsTo(()=> ModelEntity)
    model: Model;

    @HasMany(()=> Package, {onDelete: 'CASCADE'})
    packages: Package[];
}