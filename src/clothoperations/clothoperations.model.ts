import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Operation } from "src/operations/operations.model";
import { Party } from "src/parties/parties.model";
import { Person } from "src/persons/persons.model";
import { Price } from "src/prices/prices.model";

export interface IClothOperationCreationAttrs{
    operationId: number;
    partyId: number;
    personId: number;
    priceId: number;
}

@Table({tableName: 'clothoperations', timestamps: false})
export class ClothOperation extends Model<ClothOperation, IClothOperationCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 1, description: 'Id операции'})
    @ForeignKey(() => Operation)
    @Column({type: DataType.INTEGER, allowNull: false})
    operationId: number;

    @ApiProperty({example: 1, description: 'Id партии'})
    @ForeignKey(() => Party)
    @Column({type: DataType.INTEGER, allowNull: false})
    partyId: number;

    @ApiProperty({example: 1, description: 'Id человека'})
    @ForeignKey(()=>Person)
    @Column({type: DataType.INTEGER, allowNull: false})
    personId: number;

    @ApiProperty({example: 1, description: 'Id зафиксированной цены в данный момент у операции'})
    @ForeignKey(() => Price)
    @Column({type: DataType.INTEGER, allowNull: false})
    priceId: number;

    @BelongsTo(()=> Operation)
    operation: Operation;

    @BelongsTo(()=> Party)
    party: Party;

    @BelongsTo(()=> Person)
    person: Person;

    @BelongsTo(()=> Price)
    price: Price;
}