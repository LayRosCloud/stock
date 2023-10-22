import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ModelEntity} from "../models/models.model";
import {CreateModelDto} from "../models/dto/create-model.dto";
import {ClothOperation} from "./clothoperations.model";
import {CreateClothOperationDto} from "./dto/create-clothoperation.dto";
import {Price} from "../prices/prices.model";
import {Operation} from "../operations/operations.model";
import {Person} from "../persons/persons.model";
import {Party} from "../parties/parties.model";

@Injectable()
export class ClothoperationsService {
    constructor(@InjectModel(ClothOperation) private readonly clothOperationRepository: typeof ClothOperation){}

    async getAll(partyId: number){
        let clothOperations;
        if(partyId){
            clothOperations = this.clothOperationRepository.findAll({include: [Price, Operation, Person, Party], where: {partyId}})
        }
        else{
            clothOperations = this.clothOperationRepository.findAll({include: [Price, Operation, Person, Party]})
        }


        return clothOperations;
    }

    async get(id: number){
        const clothOperation =  await this.clothOperationRepository.findByPk(id, {include: [Price, Operation, Person, Party]});

        return clothOperation;
    }

    async create(dto: CreateClothOperationDto){
        const clothOperation = await this.clothOperationRepository.create(dto, {include: [Price, Operation, Person, Party]});
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
