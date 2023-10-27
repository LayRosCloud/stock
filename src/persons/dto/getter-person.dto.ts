import {Person} from "../persons.model";
import {ApiProperty} from "@nestjs/swagger";
import Post from "../../posts/posts.model";


export class GetterPersonDto {

    constructor(item: Person) {
        this.id = item.id;
        this.email = item.email;
        this.lastName = item.lastName;
        this.firstName = item.firstName;
        this.patronymic = item.patronymic;
        this.birthDay = item.birthDay;
        this.uid = item.uid
        this.posts = item.posts;
    }

    @ApiProperty({example: 1, description: 'Уникальный индентификатор'})
    id: number

    @ApiProperty({example: 'example@example.com', required: true, description: 'Почта пользователя'})
    email: string;

    @ApiProperty({example: 'Иванов', required: true, description: 'Фамилия пользователя'})
    lastName: string;

    @ApiProperty({example: 'Иван', required: true, description: 'Имя пользователя'})
    firstName: string;

    @ApiProperty({example: 'Иванович', required: false, description: 'Отчество пользователя'})
    patronymic: string;

    @ApiProperty({example: '1987-01-01', required: true, description: 'День рождения пользователя'})
    birthDay: Date;

    @ApiProperty({example: 'ivan', required: true, description: 'Уникальные символы пользователя'})
    uid: string;

    posts: Post[];
}