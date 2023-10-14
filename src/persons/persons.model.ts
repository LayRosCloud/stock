import { Column, Model, Table, DataType } from "sequelize-typescript";

interface IPersonCreationAttr{
    email: string;
    
    password: string;

    lastname: string;

    firstName: string;

    birthDay: Date;

    uid: string;
}

@Table({tableName: 'persons', updatedAt: false})
export class Person extends Model<Person, IPersonCreationAttr>{
    @Column({type: DataType.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING(50), allowNull: false, unique: true})
    email: string;
    
    @Column({type: DataType.STRING(50), allowNull: false})
    password: string;

    @Column({type: DataType.STRING(40), allowNull: false})
    lastName: string;

    @Column({type: DataType.STRING(40), allowNull: false})
    firstName: string;

    @Column({type: DataType.STRING(50), allowNull: true})
    patronymic: string;

    @Column({type: DataType.DATEONLY, allowNull: false})
    birthDay: Date;

    @Column({type: DataType.STRING(20), allowNull: false})
    uid: string;
}