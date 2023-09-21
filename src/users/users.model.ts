import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../user-roles/user-roles.model";

interface UserCreationAttrs{
    email: string;

    password: string;
}

@Table({
    tableName: 'users',
})
export class User extends Model<User, UserCreationAttrs>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор пользователя'})
    @Column({type: DataType.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'example@gmail.com', description: 'Почта пользователя'})
    @Column({type: DataType.STRING(50), allowNull: false, unique: true})
    email: string;

    @ApiProperty({example: '1234567890', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING(100), allowNull: false})
    password: string;

    @BelongsToMany(()=> Role, ()=> UserRoles)
    roles: Role[]
}