import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {ModelSize, tableName} from "./modelsizes.model";
import {CreateModelSizeDto} from "./dto/create-modelsize.dto";
import {HistoriesService} from "../histories/histories.service";
import {Sequelize, Transaction} from "sequelize";
import {Person} from "../persons/persons.model";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";

@Injectable()
export class ModelsizesService {
    constructor(@InjectModel(ModelSize)
                private readonly modelSizeRepository: typeof ModelSize,
                private readonly historyService: HistoriesService,
                @InjectConnection()
                private readonly sequelizeInstance: Sequelize
    ){}

    async getAll(){
        const transaction: Transaction = await this.sequelizeInstance.transaction();

        try{
            const modelSizes = await this.modelSizeRepository.findAll({transaction});

            await transaction.commit();

            return modelSizes;
        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async get(id: number){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const modelSize =  await this.modelSizeRepository.findByPk(id, {transaction});
            if(!modelSize){
                throw new NotFoundException(`Error! Object with id ${id} not found`);
            }
            await transaction.commit();

            return modelSize;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async create(dto: CreateModelSizeDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const modelSize = await this.modelSizeRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${modelSize.id} ${dto.modelId} ${dto.sizeId}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return modelSize;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: CreateModelSizeDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.modelSizeRepository.update(dto, {where: {id},transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.UPDATE,
                person.id,
                tableName,
                `Обновлена запись с полями ${id} ${dto.modelId} ${dto.sizeId}`)
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
            await this.modelSizeRepository.destroy({where: {id: id}, transaction});
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
