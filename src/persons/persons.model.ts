import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { ClothOperation } from "src/clothoperations/clothoperations.model";
import { Party } from "src/parties/parties.model";
import { Permission } from "src/permissions/permissions.model";
import Post from "src/posts/posts.model";
import {Package} from "../packages/packages.model";
import {History} from "../histories/histories.model";
import {ClothOperationPerson} from "../clothoperatiospersons/clothoperatiospersons.model";

export interface IPersonCreationAttrs{
    email: string;
    
    password: string;

    lastName: string;

    firstName: string;

    birthDay: Date;

    uid: string;
}

export const tableName: string = 'persons'

@Table({tableName: tableName, updatedAt: false, createdAt: 'dateRegistration'})
export class Person extends Model<Person, IPersonCreationAttrs>{

    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    @Column({type: DataType.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'example@example.com', description: 'Почта пользователя'})
    @Column({type: DataType.STRING(50), allowNull: false, unique: true})
    email: string;
    
    @ApiProperty({example: '1234567890', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING(300), allowNull: false})
    password: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия пользователя'})
    @Column({type: DataType.STRING(40), allowNull: false})
    lastName: string;

    @ApiProperty({example: 'Иван', description: 'Имя пользователя'})
    @Column({type: DataType.STRING(40), allowNull: false})
    firstName: string;

    @ApiProperty({example: 'Иванович',required: false, description: 'Отчество пользователя'})
    @Column({type: DataType.STRING(50), allowNull: true})
    patronymic: string;

    @ApiProperty({example: '1987-01-23', description: 'День рождения пользователя'})
    @Column({type: DataType.DATEONLY, allowNull: false})
    birthDay: Date;

    @ApiProperty({example: 'ivan', description: 'Уникальные символы пользователя'})
    @Column({type: DataType.STRING(20), allowNull: false, unique: true})
    uid: string;

    
    @BelongsToMany(() => Post, () => Permission)
    posts: Post[];

    @HasMany(() => Party)
    parties: Party[];

    @HasMany(() => Package)
    packages: Package[];

    @HasMany(() => ClothOperationPerson)
    clothOperationsPersons: ClothOperationPerson[];

    @HasMany(()=>History)
    histories: History[]
}