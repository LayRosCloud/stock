import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {Action, Actions, tableName} from "./action.model";
import {CreateActionDto} from "./dto/create-action.dto";
import {Sequelize, Transaction} from "sequelize";
import {HistoriesService} from "../histories/histories.service";
import {Person} from "../persons/persons.model";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";

@Injectable()
export class ActionsService {
    constructor(@InjectModel(Action)
                private readonly actionRepository: typeof Action,
                private readonly historyService: HistoriesService,
                @InjectConnection()
                private readonly sequelizeInstance: Sequelize
    ) { }

    async getAll(){
        const transaction: Transaction = await this.sequelizeInstance.transaction();

        try{
            const actions = await this.actionRepository.findAll({transaction});

            await transaction.commit();

            return actions;
        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async get(id: number){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const action =  await this.actionRepository.findByPk(id, {transaction});
            if(!action){
                throw new NotFoundException(`Error! Object with id ${id} not found`);
            }
            await transaction.commit();

            return action;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async create(dto: CreateActionDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const action = await this.actionRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${dto.name}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return action;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: CreateActionDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.actionRepository.update(dto, {where: {id},transaction});
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
            await this.actionRepository.destroy({where: {id: id}, transaction});
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