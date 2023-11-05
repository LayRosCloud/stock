import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {Permission} from "./permissions.model";
import {CreatePermissionDto} from "./dto/create-permission.dto";
import {Sequelize, Transaction} from "sequelize";
import {CreatePartyDto} from "../parties/dto/create-party.dto";
import {Person} from "../persons/persons.model";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";
import {tableName} from "../parties/parties.model";
import {HistoriesService} from "../histories/histories.service";

@Injectable()
export class PermissionsService {
    constructor(@InjectModel(Permission)
                private readonly permissionRepository: typeof Permission,
                private readonly historyService: HistoriesService,
                @InjectConnection()
                private readonly sequelizeInstance: Sequelize
                ){}

    async getAll(){
        const transaction: Transaction = await this.sequelizeInstance.transaction();

        try{
            const parties = await this.permissionRepository.findAll({transaction});

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
            const party =  await this.permissionRepository.findByPk(id, {transaction});
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

    async create(dto: CreatePermissionDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const party = await this.permissionRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${dto.personId}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return party;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: CreatePermissionDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.permissionRepository.update(dto, {where: {id},transaction});
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
            await this.permissionRepository.destroy({where: {id: id}, transaction});
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
