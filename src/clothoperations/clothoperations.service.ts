import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {ClothOperation, tableName} from "./clothoperations.model";
import {CreateClothOperationDto} from "./dto/create-clothoperation.dto";
import {Price} from "../prices/prices.model";
import {Operation} from "../operations/operations.model";
import {Person} from "../persons/persons.model";
import {Package} from "../packages/packages.model";
import {HistoriesService} from "../histories/histories.service";
import {Sequelize, Transaction} from "sequelize";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";
import {ClothOperationPerson} from "../clothoperatiospersons/clothoperatiospersons.model";

const include = [Price, Operation, Package, {model: ClothOperationPerson, include: [Person]} ]
@Injectable()
export class ClothoperationsService {
    constructor(@InjectModel(ClothOperation)
                private readonly clothOperationRepository: typeof ClothOperation,
                private readonly historyService: HistoriesService,
                @InjectConnection()
                private readonly sequelizeInstance: Sequelize){}

    async getAll(packageId){
        const transaction: Transaction = await this.sequelizeInstance.transaction();

        try{
            let clothOperations;
            if(packageId){
                clothOperations = await this.clothOperationRepository.findAll({where: {packageId},transaction, include});
            }else{
                clothOperations = await this.clothOperationRepository.findAll({transaction, include});
            }

            await transaction.commit();

            return clothOperations;
        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async get(id: number){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const clothOperation =  await this.clothOperationRepository.findByPk(id, {transaction});
            if(!clothOperation){
                throw new NotFoundException(`Error! Object with id ${id} not found`);
            }
            await transaction.commit();

            return clothOperation;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async create(dto: CreateClothOperationDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const clothOperation = await this.clothOperationRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${dto.packageId}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return clothOperation;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: CreateClothOperationDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.clothOperationRepository.update(dto, {where: {id},transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.UPDATE,
                person.id,
                tableName,
                `Обновлена запись с полями ${dto.packageId}`)
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
            await this.clothOperationRepository.destroy({where: {id: id}, transaction});
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
