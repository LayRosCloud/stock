import { ApiProperty } from "@nestjs/swagger";
import { IPermissionCreationAttrs } from "../permissions.model";
import { IsNumber } from "class-validator";


export class CreatePermissionDto implements IPermissionCreationAttrs{
    @ApiProperty({example: 1, description: 'Id личности'})
    @IsNumber({},{message: 'Должно быть числом'})
    personId: number;
    
    @ApiProperty({example: 1, description: 'Id должности'})
    @IsNumber({},{message: 'Должно быть числом'})
    postId: number;
}