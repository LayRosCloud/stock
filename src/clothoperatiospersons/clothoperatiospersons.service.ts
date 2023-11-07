import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {HistoriesService} from "../histories/histories.service";
import {Sequelize, Transaction} from "sequelize";
import {Person} from "../persons/persons.model";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";
import {ClothOperationPerson, tableName} from "./clothoperatiospersons.model";
import {CreateClothoperationpersonDto} from "./dto/create-clothoperationperson.dto";
import {UpdateClothoperationpersonDto} from "./dto/update-clothoperationperson.dto";

@Injectable()
export class ClothoperatiospersonsService {
    constructor(@InjectModel(ClothOperationPerson)
                private readonly clothOperationPersonRepository: typeof ClothOperationPerson,
                private readonly historyService: HistoriesService,
                @InjectConnection()
                private readonly sequelizeInstance: Sequelize
    ) { }

    async getAll(clothOperationId){
        const transaction: Transaction = await this.sequelizeInstance.transaction();

        try{
            let clothOperationPeoples;
            if(clothOperationId){
                clothOperationPeoples =  await this.clothOperationPersonRepository.findAll({where: {clothOperationId},transaction})
            }
            else{
                clothOperationPeoples =  await this.clothOperationPersonRepository.findAll({transaction})
            }

            await transaction.commit();

            return clothOperationPeoples;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async get(id: number){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const clothOperationPerson =  await this.clothOperationPersonRepository.findByPk(id, {transaction});
            if(!clothOperationPerson){
                throw new NotFoundException(`Error! Object with id ${id} not found`);
            }
            await transaction.commit();

            return clothOperationPerson;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async create(dto: CreateClothoperationpersonDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const clothOperationPerson = await this.clothOperationPersonRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${dto.personId}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return clothOperationPerson;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: UpdateClothoperationpersonDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.clothOperationPersonRepository.update(dto, {where: {id}})
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.UPDATE,
                person.id,
                tableName,
                `Обновлена запись с полями ${dto.personId}`)
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
            await this.clothOperationPersonRepository.destroy({where: {id: id}, transaction});
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
