import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "../user-roles/user-roles.model";

interface RoleCreationAttrs{
    title: string;

    description: string;
}

@Table({
    tableName: 'roles',
    timestamps: false
})
export class Role extends Model<Role, RoleCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор роли'})
    @Column({type: DataType.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'admin', description: 'Наименование роли'})
    @Column({type: DataType.STRING(30), allowNull: false, unique: true})
    title: string;

    @ApiProperty({example: 'администратор - личность, способная на любое действие в проекте', description: 'Описание роли'})
    @Column({type: DataType.STRING(255), allowNull: false})
    description: string;

    @BelongsToMany(()=> User, ()=> UserRoles)
    users: User[]
}