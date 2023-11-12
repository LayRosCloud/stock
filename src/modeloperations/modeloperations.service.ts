import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateModeloperationDto } from './dto/create-modeloperation.dto';
import { UpdateModeloperationDto } from './dto/update-modeloperation.dto';
import {Sequelize, Transaction} from "sequelize";
import {Person} from "../persons/persons.model";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";

import {Actions} from "../actions/action.model";
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {HistoriesService} from "../histories/histories.service";
import {ModelOperation, tableName} from "./entities/modeloperation.entity";

@Injectable()
export class ModeloperationsService {

  constructor(@InjectModel(ModelOperation)
              private readonly modelOperationRepository: typeof ModelOperation,
              private readonly historyService: HistoriesService,
              @InjectConnection()
              private readonly sequelizeInstance: Sequelize
  ){}

  async findAll(){
    const transaction: Transaction = await this.sequelizeInstance.transaction();

    try{
      const modelOperations = await this.modelOperationRepository.findAll({transaction});

      await transaction.commit();

      return modelOperations;
    }catch (e){
      await transaction.rollback();
      throw e;
    }

  }

  async findOne(id: number){

    const transaction = await this.sequelizeInstance.transaction();

    try{
      const modelOperation =  await this.modelOperationRepository.findByPk(id, {transaction});
      if(!modelOperation){
        throw new NotFoundException(`Error! Object with id ${id} not found`);
      }
      await transaction.commit();

      return modelOperation;
    }catch (e){
      await transaction.rollback();
      throw e;
    }
  }

  async create(dto: CreateModeloperationDto, person: Person){

    const transaction = await this.sequelizeInstance.transaction();

    try{
      const modelOperation = await this.modelOperationRepository.create(dto, {transaction});
      const historyDto: CreateHistoryDto = new CreateHistoryDto(
          Actions.POST,
          person.id,
          tableName,
          `Создана запись с полями ${modelOperation.id} ${dto.modelId} ${dto.operationId}`)
      await this.historyService.create(historyDto, transaction)
      await transaction.commit();

      return modelOperation;

    }catch (e){
      await transaction.rollback();
      throw e;
    }

  }

  async update(id: number, dto: UpdateModeloperationDto, person: Person){
    const transaction = await this.sequelizeInstance.transaction();

    try{
      await this.modelOperationRepository.update(dto, {where: {id},transaction});
      const historyDto: CreateHistoryDto = new CreateHistoryDto(
          Actions.UPDATE,
          person.id,
          tableName,
          `Обновлена запись с полями ${id} ${dto.modelId} ${dto.operationId}`)
      await this.historyService.create(historyDto, transaction)
      await transaction.commit();

      return this.findOne(id);

    }catch (e){
      await transaction.rollback();
      throw e;
    }
  }

  async remove(id: number, person: Person){
    await this.findOne(id)
    const transaction = await this.sequelizeInstance.transaction();

    try{
      await this.modelOperationRepository.destroy({where: {id: id}, transaction});
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
