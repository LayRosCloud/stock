import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ModelSize} from "../modelsizes/modelsizes.model";
import {CreateModelSizeDto} from "../modelsizes/dto/create-modelsize.dto";
import {ModelEntity} from "./models.model";
import {CreateModelDto} from "./dto/create-model.dto";

@Injectable()
export class ModelsService {
    constructor(@InjectModel(ModelEntity) private readonly modelRepository: typeof ModelEntity){}

    async getAll(){
        const models = await this.modelRepository.findAll();

        return models;
    }

    async get(id: number){
        const model =  await this.modelRepository.findByPk(id);

        return model;
    }

    async create(dto: CreateModelDto){
        const model = await this.modelRepository.create(dto);
        return model;
    }

    async update(id: number, dto: CreateModelDto){
        await this.modelRepository.update(dto, {where: {id: id}});
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.modelRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
