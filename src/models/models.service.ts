import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {CreateModelSizeDto} from "../modelsizes/dto/create-modelsize.dto";
import {ModelEntity, tableName} from "./models.model";
import {HistoriesService} from "../histories/histories.service";
import {Sequelize, Transaction} from "sequelize";
import {Person} from "../persons/persons.model";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";
import {CreateModelDto} from "./dto/create-model.dto";

@Injectable()
export class ModelsService {
    constructor(@InjectModel(ModelEntity)
                private readonly modelRepository: typeof ModelEntity,
                private readonly historyService: HistoriesService,
                @InjectConnection()
                private readonly sequelizeInstance: Sequelize
    ){}

    async getAll(){
        const transaction: Transaction = await this.sequelizeInstance.transaction();

        try{
            const modelEntities = await this.modelRepository.findAll({transaction});

            await transaction.commit();

            return modelEntities;
        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async get(id: number){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const modelEntity =  await this.modelRepository.findByPk(id, {transaction});
            if(!modelEntity){
                throw new NotFoundException(`Error! Object with id ${id} not found`);
            }
            await transaction.commit();

            return modelEntity;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async create(dto: CreateModelDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const modelEntity = await this.modelRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${dto.title}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return modelEntity;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: CreateModelDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.modelRepository.update(dto, {where: {id},transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.UPDATE,
                person.id,
                tableName,
                `Обновлена запись с полями ${dto.title}`)
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
            await this.modelRepository.destroy({where: {id: id}, transaction});
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
