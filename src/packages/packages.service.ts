import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Package} from "./packages.model";
import {Size} from "../sizes/sizes.model";
import {ModelEntity} from "../models/models.model";
import {Person} from "../persons/persons.model";
import {CreatePartyDto} from "../parties/dto/create-party.dto";
import {CreatePackageDto} from "./dto/create-package.dto";

@Injectable()
export class PackagesService {
    constructor(
            @InjectModel(Package)
            private readonly packageRepository: typeof Package
    ) { }

    async getAll(partyId?: number){
        if(partyId){
            return await this.packageRepository.findAll({where: {partyId}});
        }
        else{
            return await this.packageRepository.findAll();
        }
    }

    async get(id: number){
        const getPackage =  await this.packageRepository.findByPk(id, {include: [Size, ModelEntity, Person]});
        return getPackage;
    }

    async create(dto: CreatePackageDto): Promise<Package>{
        const getPackage = await this.packageRepository.create(dto);
        return getPackage;
    }

    async createRange(dtos: CreatePackageDto[]){
        const newList: Package[] = [];
        for(let i = 0; i < dtos.length; i++){
            newList.push(await this.create(dtos[i]));
        }

        return newList;
    }

    async update(id: number, dto: CreatePackageDto){
        await this.packageRepository.update(dto, {where: {id: id}});
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.packageRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
