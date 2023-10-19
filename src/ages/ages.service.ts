import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateClothOperationDto} from "../clothoperations/dto/create-clothoperation.dto";
import {Age} from "./ages.model";
import {CreateAgeDto} from "./dto/create-age.dto";

@Injectable()
export class AgesService {
    constructor(@InjectModel(Age) private readonly ageRepository: typeof Age){}

    async getAll(){
        const ages = await this.ageRepository.findAll();

        return ages;
    }

    async get(id: number){
        const age =  await this.ageRepository.findByPk(id);

        return age;
    }

    async create(dto: CreateAgeDto){
        const age = await this.ageRepository.create(dto);
        return age;
    }

    async update(id: number, dto: CreateAgeDto){
        await this.ageRepository.update(dto, {where: {id: id}});
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.ageRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
