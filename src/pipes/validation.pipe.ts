import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";


export class ValidationPipe implements PipeTransform<any>{
    async transform(value: any, metadata: ArgumentMetadata) {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);

        if(errors.length){
            let messages = errors.map(error => `${error.property}: ${Object.values(error.constraints).join(', ')}`)
            throw new ValidationException(messages);
        }

        return value;
    }
}