import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {Age} from "./ages.model";
import {HistoriesService} from "../histories/histories.service";
import {Sequelize, Transaction} from "sequelize";
import {Person} from "../persons/persons.model";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";
import {tableName} from "../clothoperations/clothoperations.model";
import {CreateAgeDto} from "./dto/create-age.dto";

@Injectable()
export class AgesService {
    constructor(@InjectModel(Age)
                private readonly ageRepository: typeof Age,
                private readonly historyService: HistoriesService,
                @InjectConnection()
                private readonly sequelizeInstance: Sequelize
    ){}

    async getAll(){
        const transaction: Transaction = await this.sequelizeInstance.transaction();

        try{
            const ages = await this.ageRepository.findAll({transaction});

            await transaction.commit();

            return ages;
        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async get(id: number){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const age =  await this.ageRepository.findByPk(id, {transaction});
            if(!age){
                throw new NotFoundException(`Error! Object with id ${id} not found`);
            }
            await transaction.commit();

            return age;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async create(dto: CreateAgeDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const age = await this.ageRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${dto.name}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return age;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: CreateAgeDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.ageRepository.update(dto, {where: {id},transaction});
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
            await this.ageRepository.destroy({where: {id: id}, transaction});
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
