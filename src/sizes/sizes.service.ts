import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Size } from './sizes.model';

@Injectable()
export class SizesService {
    constructor(@InjectModel(Size) private readonly sizeRepository: typeof Size){}
}
