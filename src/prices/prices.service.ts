import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {CreatePriceDto} from "./dto/create-price.dto";
import {Price, tableName} from "./prices.model";
import {HistoriesService} from "../histories/histories.service";
import {Sequelize} from "sequelize";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";
import {Person} from "../persons/persons.model";

@Injectable()
export class PricesService {
    constructor(@InjectModel(Price)
                private readonly priceRepository: typeof Price,
                private readonly historyService: HistoriesService,
                @InjectConnection()
                private readonly sequelizeInstance: Sequelize
    ){}

    async getAll(){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            const prices = await this.priceRepository.findAll();

            await transaction.commit();

            return prices;
        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async get(id: number){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const price =  await this.priceRepository.findByPk(id);
            if(!price){
                throw new NotFoundException(`Error! Object with id ${id} not found`);
            }
            await transaction.commit();

            return price;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async create(dto: CreatePriceDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const price = await this.priceRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${dto.number}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return price;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: CreatePriceDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.priceRepository.update(dto, {where: {id},transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Обновлена запись с полями ${dto.number}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return this.get(id);

        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async delete(id: number,person: Person){
        await this.get(id)
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.priceRepository.destroy({where: {id: id}, transaction});
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
