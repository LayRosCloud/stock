import { PartialType } from '@nestjs/swagger';
import { CreateModeloperationDto } from './create-modeloperation.dto';

export class UpdateModeloperationDto extends PartialType(CreateModeloperationDto) { }
