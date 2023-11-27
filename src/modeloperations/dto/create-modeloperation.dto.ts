import {IsNumber} from "class-validator";

export class CreateModeloperationDto {
    @IsNumber({},{message: 'Должно быть числом'})
    modelId: number;

    @IsNumber({},{message: 'Должно быть числом'})
    operationId: number;
}
