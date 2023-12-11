import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {Package, tableName} from "./packages.model";
import {Size} from "../sizes/sizes.model";
import {Person} from "../persons/persons.model";
import {CreatePackageDto} from "./dto/create-package.dto";
import {Op, Sequelize, Transaction} from "sequelize";
import Post from "../posts/posts.model";
import {Material} from "../materials/materials.model";
import {HistoriesService} from "../histories/histories.service";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";
import {UpdatePackageDto} from "./dto/update-package.dto";
import {Age} from "../ages/ages.model";
import {ClothOperation} from "../clothoperations/clothoperations.model";
import {Operation} from "../operations/operations.model";

const include = [
    {model: Material, attributes: ['name']},
    {model: Size, attributes: ['number'],
    include: [
        {model: Age, attributes: ['name']}
    ]
    },
    {model: Person,
        attributes: ['lastName', 'firstName', 'patronymic', 'uid'],
        include: [{model: Post, attributes: ['name']}]
    },
    {model: ClothOperation, include: [{model: Operation, attributes: ['name']}], attributes: ['operationId', 'isEnded']}
]


@Injectable()
export class PackagesService {
    constructor(
            @InjectModel(Package)
            private readonly packageRepository: typeof Package,
            private readonly historyService: HistoriesService,
            @InjectConnection()
            private readonly sequelizeInstance: Sequelize
    ) { }

    async createRange(dtos: CreatePackageDto[], person: Person){
        const newList: Package[] = [];
        const transaction: Transaction = await this.sequelizeInstance.transaction();
        try{
            for(let i = 0; i < dtos.length; i++){
                newList.push(await this.packageRepository.create(dtos[i], {transaction}));
            }
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Добавлен список из ${newList.length} записей`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();
        }catch (e){
            await transaction.rollback();
            throw e;
        }


        return newList;
    }
    async getAll(personId, partyId){
        const transaction: Transaction = await this.sequelizeInstance.transaction();

        try{
            const newInclude = [...include];
            const where = {}
            if(personId){
                // @ts-ignore
                where.personId = personId;
            }
            if(partyId){
                // @ts-ignore
                where.partyId = partyId;
            }
            const packages = await this.packageRepository.findAll({where, transaction, include: newInclude})
            await transaction.commit();

            return packages;
        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async get(id: number){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const packageObj =  await this.packageRepository.findByPk(id, {attributes: {exclude: ['partyId', 'personId', 'sizeId']}, transaction});
            if(!packageObj){
                throw new NotFoundException(`Error! Object with id ${id} not found`);
            }
            await transaction.commit();

            return packageObj;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }

    async create(dto: CreatePackageDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const packageObj = await this.packageRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${packageObj.id}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return packageObj;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: UpdatePackageDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.packageRepository.update(dto, {where: {id},transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.UPDATE,
                person.id,
                tableName,
                `Обновлена запись с полями ${id}`)
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
            await this.packageRepository.destroy({where: {id: id}, transaction});
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