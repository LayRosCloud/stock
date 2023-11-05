import { ApiProperty } from "@nestjs/swagger";
import { Model, DataType, Column, Table, ForeignKey } from "sequelize-typescript";
import { Person } from "src/persons/persons.model";
import Post from "src/posts/posts.model";

export interface IPermissionCreationAttrs{
    personId: number;
    postId: number;
}
export const tableName: string = 'permissions'
@Table({tableName: tableName, timestamps: false})
export class Permission extends Model<Permission, IPermissionCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: 1, description: 'Id личности'})
    @ForeignKey(()=>Person)
    @Column({type: DataType.INTEGER, allowNull: false})
    personId: number;

    @ApiProperty({example: 1, description: 'Id должности'})
    @ForeignKey(()=>Post)
    @Column({type: DataType.INTEGER, allowNull: false})
    postId: number;
}