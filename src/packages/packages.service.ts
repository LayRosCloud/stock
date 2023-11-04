import { Injectable } from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {Package} from "./packages.model";
import {Size} from "../sizes/sizes.model";
import {ModelEntity} from "../models/models.model";
import {Person} from "../persons/persons.model";
import {CreatePackageDto} from "./dto/create-package.dto";
import {UpdatePackageDto} from "./dto/update-package.dto";
import {Sequelize, Transaction} from "sequelize";
import Post from "../posts/posts.model";

const include =  [Size, ModelEntity, {model: Person, attributes: { exclude: ['password'] }, include: [Post]}];

@Injectable()
export class PackagesService {
    constructor(
            @InjectModel(Package)
            private readonly packageRepository: typeof Package,
            @InjectConnection()
            private readonly sequelizeInstance: Sequelize
    ) { }

    async getAll(partyId?: number){
        if(partyId){
            return await this.packageRepository.findAll({where: {partyId}, include});
        }
        else{
            return await this.packageRepository.findAll({include});
        }
    }

    async get(id: number){
        const getPackage =  await this.packageRepository.findByPk(id, {include});
        return getPackage;
    }

    async create(dto: CreatePackageDto): Promise<Package>{
        const getPackage = await this.packageRepository.create(dto);
        return getPackage;
    }

    async createRange(dtos: CreatePackageDto[]){
        const newList: Package[] = [];
        const transaction: Transaction = await this.sequelizeInstance.transaction();
        try{
            for(let i = 0; i < dtos.length; i++){
                newList.push(await this.packageRepository.create(dtos[i], {transaction}));
            }
            await transaction.commit();
        }catch (e){
            await transaction.rollback();
            throw e;
        }


        return newList;
    }

    async update(id: number, dto: UpdatePackageDto){
        await this.packageRepository.update(dto, {where: {id: id}});
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.packageRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
