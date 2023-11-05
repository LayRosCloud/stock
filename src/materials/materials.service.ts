import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {Material, tableName} from "./materials.model";
import {CreateMaterialDto} from "./dto/create-material.dto";
import {HistoriesService} from "../histories/histories.service";
import {Sequelize, Transaction} from "sequelize";
import {Person} from "../persons/persons.model";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";

@Injectable()
export class MaterialsService {
    constructor(
        @InjectModel(Material)
        private readonly materialRepository: typeof Material,
        @InjectConnection()
        private readonly sequelizeInstance: Sequelize,
        private readonly historyService: HistoriesService
    ) { }

    async getAll(){
        const transaction: Transaction = await this.sequelizeInstance.transaction();

        try{
            const materials = await this.materialRepository.findAll({transaction});

            await transaction.commit();

            return materials;
        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async get(id: number){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const material =  await this.materialRepository.findByPk(id, {transaction});

            if(!material){
                throw new NotFoundException(`Error! Object with id ${id} not found`);
            }

            await transaction.commit();

            return material;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async create(dto: CreateMaterialDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const party = await this.materialRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${dto.name}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return party;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: CreateMaterialDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.materialRepository.update(dto, {where: {id},transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.UPDATE,
                person.id,
                tableName,
                `Обновлена запись с полями ${dto.name}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return this.get(id);

        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async delete(id: number, person: Person){
        await this.get(id)
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.materialRepository.destroy({where: {id: id}, transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.DELETE,
                person.id,
                tableName,
                `Удалена запись с id = ${id}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return {status: 200, message: `Object with ${id} will be destroyed`}
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }
}