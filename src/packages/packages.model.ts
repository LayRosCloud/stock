import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {Size} from "../sizes/sizes.model";
import {Party} from "../parties/parties.model";

export interface IPackageCreationAttrs{
    partyId: number
    sizeId: number
    count: number;
}

@ApiTags('Пачки')
@Table({tableName: 'packages', timestamps: false})
export class Package extends Model<Package, IPackageCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 1, description: 'Пачка к какой крое относится'})
    @ForeignKey(()=> Party)
    @Column({type: DataType.INTEGER, allowNull: false})
    partyId: number

    @ApiProperty({example: 1, description: 'Размер выбранной модели'})
    @ForeignKey(()=> Size)
    @Column({type: DataType.INTEGER, allowNull: false})
    sizeId: number

    @ApiProperty({example: 1, description: 'Количество партий'})
    @Column({type: DataType.INTEGER, allowNull: false})
    count: number;

    @BelongsTo(()=> Size)
    size: Size;

    @BelongsTo(()=> Party)
    party: Party;
}