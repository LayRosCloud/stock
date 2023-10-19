import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ModelEntity} from "../models/models.model";
import {CreateModelDto} from "../models/dto/create-model.dto";
import {ClothOperation} from "./clothoperations.model";
import {CreateClothOperationDto} from "./dto/create-clothoperation.dto";

@Injectable()
export class ClothoperationsService {
    constructor(@InjectModel(ClothOperation) private readonly clothOperationRepository: typeof ClothOperation){}

    async getAll(){
        const clothOperations = await this.clothOperationRepository.findAll();

        return clothOperations;
    }

    async get(id: number){
        const clothOperation =  await this.clothOperationRepository.findByPk(id);

        return clothOperation;
    }

    async create(dto: CreateClothOperationDto){
        const clothOperation = await this.clothOperationRepository.create(dto);
        return clothOperation;
    }

    async update(id: number, dto: CreateClothOperationDto){
        await this.clothOperationRepository.update(dto, {where: {id: id}});
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.clothOperationRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
