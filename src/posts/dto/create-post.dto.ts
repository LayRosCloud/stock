import { ApiProperty } from "@nestjs/swagger";
import { IPostCreationAttrs } from "../posts.model";
import { IsString, Length } from "class-validator";

export class CreatePostDto implements IPostCreationAttrs{
    @ApiProperty({example: 'Директор', description: 'Название должности'})
    @IsString({message: 'Должен быть строкой'})
    @Length(1, 30, {message: 'От 1 до 30 символа'})
    readonly name: string;
    
    @ApiProperty({example: 'Человек, который стоит во главе организации', description: 'Описание должности'})
    @IsString({message: 'Должен быть строкой'})
    @Length(1, 255, {message: 'От 1 до 255 символа'})
    readonly description: string;
}