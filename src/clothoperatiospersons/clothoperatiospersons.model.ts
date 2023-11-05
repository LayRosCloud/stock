import { ApiProperty } from "@nestjs/swagger";
import {Model, DataType, Column, Table, ForeignKey, BelongsTo} from "sequelize-typescript";
import {Person} from "../persons/persons.model";
import {ClothOperation} from "../clothoperations/clothoperations.model";

export interface IClothOperationPersonsCreationAttrs{
    personId: number;
    clothOperationId: number;
    dateStart: Date;
}
export const tableName: string = 'clothoperationspersons'
@Table({tableName: tableName, timestamps: false})
export class ClothOperationPerson extends Model<ClothOperationPerson, IClothOperationPersonsCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 1, description: 'Человек занимающийся операцией'})
    @ForeignKey(()=> Person)
    @Column({type: DataType.INTEGER, allowNull: false})
    personId: number;

    @ApiProperty({example: 1, description: 'Человек занимающийся операцией'})
    @ForeignKey(()=> ClothOperation)
    @Column({type: DataType.INTEGER, allowNull: false})
    clothOperationId: number;

    @ApiProperty({example: '2010-10-10', description: 'Дата начала операции'})
    @Column({type: DataType.DATE, allowNull: false})
    dateStart: Date;

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: '0'})
    isEnded: boolean;

    @BelongsTo(()=> Person)
    person: Person;

    @BelongsTo(()=> ClothOperation)
    clothOperation: ClothOperation;
}