import {ApiProperty} from "@nestjs/swagger";


export class CreateRoleDto {
    @ApiProperty({example: 'admin', description: 'Наименование роли'})
    readonly title: string;

    @ApiProperty({example: 'администратор - личность, способная на любое действие в проекте', description: 'Описание роли'})
    readonly description: string;
}