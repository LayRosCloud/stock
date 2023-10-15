import { ApiProperty } from "@nestjs/swagger";
import { IPermissionCreationAttrs } from "../permissions.model";


export class CreatePermissionDto implements IPermissionCreationAttrs{
    @ApiProperty({example: 1, description: 'Id личности'})
    personId: number;
    
    @ApiProperty({example: 1, description: 'Id должности'})
    postId: number;
}