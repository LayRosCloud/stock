import {Injectable, NotFoundException} from '@nestjs/common';
import {HistoriesService} from "../histories/histories.service";
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {ModelPrice, tableName} from "./modelprices.model";
import {Sequelize} from "sequelize";
import {Actions} from "../actions/action.model";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {CreateModelpriceDto} from "./dto/create-modelprice.dto";

@Injectable()
export class ModelpricesService {
    constructor(
        @InjectModel(ModelPrice)
        private readonly modelPriceRepository: typeof ModelPrice,
        private readonly historyService: HistoriesService,
        @InjectConnection()
        private readonly sequelizeInstance: Sequelize
    ) { }

    async getAll() {
        const transaction = await this.sequelizeInstance.transaction();
        try{
            const modelPrices = await this.modelPriceRepository.findAll({transaction})
            await transaction.commit();
            return modelPrices
        }catch (e){
            await transaction.rollback();
            throw e
        }
    }

    async get(id: number) {
        const transaction = await this.sequelizeInstance.transaction();
        try{
            const modelPrice = await this.modelPriceRepository.findByPk(id,{transaction})
            if(!modelPrice){
                throw new NotFoundException(`Error! Object with ${id} not found!`)
            }
            await transaction.commit();
            return modelPrice
        }catch (e){
            await transaction.rollback();
            throw e
        }
    }

    async create(dto: CreateModelpriceDto, person) {
        const transaction = await this.sequelizeInstance.transaction();
        try{
            const modelPrice = await this.modelPriceRepository.create(dto,{transaction})
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${dto.modelId} ${dto.priceId}`)
            await this.historyService.create(historyDto, transaction);
            await transaction.commit();
            return modelPrice
        }catch (e){
            await transaction.rollback();
            throw e
        }
    }

    async update(id: number, dto: CreateModelpriceDto, person) {
        const transaction = await this.sequelizeInstance.transaction();
        try{
            await this.modelPriceRepository.update(dto,{where: {id},transaction})
            const modelPrice =  this.modelPriceRepository.findByPk(id,{transaction})
            if(!modelPrice){
                throw new NotFoundException(`Error! Object with id ${id} not found`)
            }
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.UPDATE,
                person.id,
                tableName,
                `Обновлена запись с полями ${dto.modelId} ${dto.priceId}`)
            await this.historyService.create(historyDto, transaction);
            await transaction.commit();
            return modelPrice
        }catch (e){
            await transaction.rollback();
            throw e
        }
    }

    async delete(id: number, person) {
        const transaction = await this.sequelizeInstance.transaction();
        try{
            await this.get(id)
            await this.modelPriceRepository.destroy({where: {id}, transaction})
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.DELETE,
                person.id,
                tableName,
                `Удалена запись с полями ${id}`)
            await transaction.commit();
            await this.historyService.create(historyDto, transaction);
        }catch (e){
            await transaction.rollback();
            throw e
        }
    }
}
