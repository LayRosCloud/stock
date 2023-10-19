import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreatePartyDto} from "../parties/dto/create-party.dto";
import {Operation} from "./operations.model";
import {CreateOperationDto} from "./dto/create-operation.dto";

@Injectable()
export class OperationsService {
    constructor(@InjectModel(Operation) private readonly operationRepository: typeof Operation){}

    async getAll(){
        const operations = await this.operationRepository.findAll();

        return operations;
    }

    async get(id: number){
        const operation =  await this.operationRepository.findByPk(id);

        return operation;
    }

    async create(dto: CreateOperationDto){
        const operation = await this.operationRepository.create(dto);

        return operation;
    }

    async update(id: number, dto: CreateOperationDto){
        await this.operationRepository.update(dto, {where: {id: id}});

        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.operationRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
