import { Injectable } from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {History} from "./histories.model";
import {CreateHistoryDto} from "./dto/create-history.dto";
import {Sequelize, Transaction} from "sequelize";

@Injectable()
export class HistoriesService {
    constructor(
        @InjectModel(History)
        private readonly historyRepository: typeof History,
        @InjectConnection()
        private readonly sequelizeInstance: Sequelize) {
    }
    public async getAll(){
        const transaction = await this.sequelizeInstance.transaction();
        try{
            const histories = await this.historyRepository.findAll({transaction});
            await transaction.commit();
            return histories;
        }
        catch (e){
            await transaction.rollback();
            throw e;
        }
    }
    public async create(dto: CreateHistoryDto, transaction: Transaction){
        await this.historyRepository.create(dto, {transaction})
    }
}
