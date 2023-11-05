import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {Color, tableName} from "./colors.model";
import {CreateColorDto} from "./dto/create-color.dto";
import {HistoriesService} from "../histories/histories.service";
import {Sequelize, Transaction} from "sequelize";
import {Person} from "../persons/persons.model";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";

@Injectable()
export class ColorsService {
    constructor(@InjectModel(Color)
                private readonly colorRepository: typeof Color,
                private readonly historyService: HistoriesService,
                @InjectConnection()
                private readonly sequelizeInstance: Sequelize
    ) { }

    async getAll(){
        const transaction: Transaction = await this.sequelizeInstance.transaction();

        try{
            const colors = await this.colorRepository.findAll({transaction});

            await transaction.commit();

            return colors;
        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async get(id: number){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const color =  await this.colorRepository.findByPk(id, {transaction});
            if(!color){
                throw new NotFoundException(`Error! Object with id ${id} not found`);
            }
            await transaction.commit();

            return color;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async create(dto: CreateColorDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const color = await this.colorRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${dto.name}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return color;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: CreateColorDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.colorRepository.update(dto, {where: {id},transaction});
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
            await this.colorRepository.destroy({where: {id: id}, transaction});
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
