import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {User} from "../users/users.model";

@Table({
    tableName: 'user_roles',
    timestamps: false
})
export class UserRoles extends Model<UserRoles>{
    @ApiProperty({example: 1, description: 'Уникальный индентификатор роли'})
    @Column({type: DataType.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(()=> Role)
    @Column({type: DataType.INTEGER, allowNull: false})
    roleId: number;

    @ForeignKey(()=> User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;
}