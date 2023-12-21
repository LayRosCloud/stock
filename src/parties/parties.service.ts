import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {Party, tableName} from "./parties.model";
import {CreatePartyDto} from "./dto/create-party.dto";
import {ModelEntity} from "../models/models.model";
import {Person} from "../persons/persons.model";
import {HistoriesService} from "../histories/histories.service";
import {Sequelize, Transaction} from "sequelize";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";
import {Price} from "../prices/prices.model";
import {Operation} from "../operations/operations.model";

const include = [{model: ModelEntity, include: [Operation]}, Price, {model: Person, attributes: {exclude: ['password']}}];
@Injectable()
export class PartiesService {
    constructor(@InjectModel(Party)
                private readonly partyRepository: typeof Party,
                private readonly historyService: HistoriesService,
                @InjectConnection()
                private readonly sequelizeInstance: Sequelize
    ){}

    async getAll(personId){
        const transaction: Transaction = await this.sequelizeInstance.transaction();
        try{
            const where = {}
            if(personId){
                // @ts-ignore
                where.personId = personId
            }
            const parties = await this.partyRepository.findAll({where, include, transaction});

            await transaction.commit();

            return parties;
        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async get(id: number){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const party =  await this.partyRepository.findByPk(id, {include, transaction});
            if(!party){
                throw new NotFoundException(`Error! Object with id ${id} not found`);
            }
            await transaction.commit();

            return party;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async create(dto: CreatePartyDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const party = await this.partyRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${dto.cutNumber}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return party;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: CreatePartyDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.partyRepository.update(dto, {where: {id},transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.UPDATE,
                person.id,
                tableName,
                `Обновлена запись с полями ${dto.dateStart}`)
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
            await this.partyRepository.destroy({where: {id: id}, transaction});
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
