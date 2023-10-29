import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {ClothOperation} from "./clothoperations.model";
import {CreateClothOperationDto} from "./dto/create-clothoperation.dto";
import {Price} from "../prices/prices.model";
import {Operation} from "../operations/operations.model";
import {Person} from "../persons/persons.model";
import {Package} from "../packages/packages.model";
import { UpdateClothOperationDto } from './dto/update-clothoperation.dto';

@Injectable()
export class ClothoperationsService {
    constructor(@InjectModel(ClothOperation) private readonly clothOperationRepository: typeof ClothOperation){}

    async getAll(packageId?){
        let clothOperations;
        if(packageId){
            clothOperations = this.clothOperationRepository.findAll({include: [Price, Operation, Person, Package], where: {packageId}})
        }
        else{
            console.log('успех!');
            clothOperations = this.clothOperationRepository.findAll({include: [Price, Operation, Person, Package]})
        }


        return clothOperations;
    }

    async get(id: number){
        const clothOperation =  await this.clothOperationRepository.findByPk(id, {include: [Price, Operation, Person, Package]});

        return clothOperation;
    }

    async create(dto: CreateClothOperationDto){
        const clothOperation = await this.clothOperationRepository.create(dto, {include: [Price, Operation, Person, Package]});
        return clothOperation;
    }

    async update(id: number, dto: UpdateClothOperationDto){
        await this.clothOperationRepository.update(dto, {where: {id: id}});
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.clothOperationRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
