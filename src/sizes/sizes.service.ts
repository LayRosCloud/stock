import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Size } from './sizes.model';
import {CreateSizeDto} from "./dto/create-size.dto";

@Injectable()
export class SizesService {
    constructor(@InjectModel(Size) private readonly sizeRepository: typeof Size){}

    async getAll(){
        const sizes = await this.sizeRepository.findAll();

        return sizes;
    }

    async get(id: number){
        const size =  await this.sizeRepository.findByPk(id);

        return size;
    }

    async create(dto: CreateSizeDto){
        const size = await this.sizeRepository.create(dto);
        return size;
    }

    async update(id: number, dto: CreateSizeDto){
        await this.sizeRepository.update(dto, {where: {id: id}});
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.sizeRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
