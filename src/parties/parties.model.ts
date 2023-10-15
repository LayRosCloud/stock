import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { ClothOperation } from "src/clothoperations/clothoperations.model";
import { ModelEntity } from "src/models/models.model";
import { Person } from "src/persons/persons.model";
import { Size } from "src/sizes/sizes.model";

export interface IPartyCreationAttrs{
    modelId: number;
    personId: number;
    count: number;
    dateStart: Date;
    cutNumber: number
    sizeId: number
}

@Table({tableName: 'parties', timestamps: false})
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

    @ApiProperty({example: 1, description: 'Количество партий'})
    @Column({type: DataType.INTEGER, allowNull: false})
    count: number;

    @ApiProperty({example: '2010-01-13', description: 'Дата начала партии'})
    @Column({type: DataType.DATEONLY, allowNull: false})
    dateStart: Date;

    @ApiProperty({example: '2010-02-13', description: 'Дата окончания партии'})
    @Column({type: DataType.DATEONLY, allowNull: true})
    dateEnd: Date;

    @ApiProperty({example: false, required: false, description: 'Забракована ли партия?'})
    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: '0'})
    isDefected: boolean;

    @ApiProperty({example: 1, description: 'Номер крои'})
    @Column({type: DataType.INTEGER, allowNull: false})
    cutNumber: number
    
    @ApiProperty({example: 1, description: 'Размер выбранной модели'})
    @ForeignKey(()=> Size)
    @Column({type: DataType.INTEGER, allowNull: false})
    sizeId: number

    @BelongsTo(()=> Size)
    size: Size;

    @BelongsTo(()=> Person)
    person: Person;

    @BelongsTo(()=> ModelEntity)
    model: Model;

    @HasMany(()=> ClothOperation)
    clothOperations: ClothOperation[];
}