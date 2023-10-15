import { ApiProperty } from "@nestjs/swagger";
import { IPostCreationAttrs } from "../posts.model";

export class CreatePostDto implements IPostCreationAttrs{
    @ApiProperty({example: 'Директор', description: 'Название должности'})
    readonly name: string;
    
    @ApiProperty({example: 'Человек, который стоит во главе организации', description: 'Описание должности'})
    readonly description: string;
}