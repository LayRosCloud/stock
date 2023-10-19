import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ModelSize} from "./modelsizes.model";
import {CreateModelSizeDto} from "./dto/create-modelsize.dto";

@Injectable()
export class ModelsizesService {
    constructor(@InjectModel(ModelSize) private readonly modelSizeRepository: typeof ModelSize){}

    async getAll(){
        const sizes = await this.modelSizeRepository.findAll();

        return sizes;
    }

    async get(id: number){
        const size =  await this.modelSizeRepository.findByPk(id);

        return size;
    }

    async create(dto: CreateModelSizeDto){
        const size = await this.modelSizeRepository.create(dto);
        return size;
    }

    async update(id: number, dto: CreateModelSizeDto){
        await this.modelSizeRepository.update(dto, {where: {id: id}});
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.modelSizeRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
