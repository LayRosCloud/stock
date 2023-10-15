import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Model, DataType, Column, Table, BelongsToMany, HasMany } from "sequelize-typescript";
import { ModelSize } from "src/modelsizes/modelsizes.model";
import { Party } from "src/parties/parties.model";
import { Size } from "src/sizes/sizes.model";

export interface IModelCreationAttrs{
    title: string;
    description: string;
    codeVendor: string;
    percent: number;
}

@ApiTags('Модели')
@Table({tableName: 'models', timestamps: false})
export class ModelEntity extends Model<ModelEntity, IModelCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 'Треники', description: 'Название модели'})
    @Column({type: DataType.STRING(30), allowNull: false})
    title: string;

    @ApiProperty({example: 'Штаны с резинкой на ступнях', description: 'Описание модели'})
    @Column({type: DataType.STRING(255), allowNull: false})
    description: string;

    @ApiProperty({example: 'Ш230123', description: 'Артикул модели'})
    @Column({type: DataType.STRING(30), allowNull: false})
    codeVendor: string;

    @ApiProperty({example: 100, description: 'Процент наценки'})
    @Column({type: DataType.SMALLINT, allowNull: false})
    percent: number;

    @HasMany(()=>Party)
    parties: Party[] 

    @BelongsToMany(() => Size, () => ModelSize)
    sizes: Size[]
}