import { Injectable } from "@nestjs/common";
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {Size, tableName} from "./sizes.model";
import { CreateSizeDto } from "./dto/create-size.dto";
import { Age } from "src/ages/ages.model";
import {Sequelize} from "sequelize";
import {HistoriesService} from "../histories/histories.service";
import {Person} from "../persons/persons.model";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";

@Injectable()
export class SizesService {
  constructor(
    @InjectModel(Size)
    private readonly sizeRepository: typeof Size,
    private readonly historyService: HistoriesService,
    @InjectConnection()
    private readonly sequelizeInstance: Sequelize
  ) {}

  async getAll() {
    const transaction = await this.sequelizeInstance.transaction();

    try{
      const sizes = await this.sizeRepository.findAll({ include: [Age] });
      await transaction.commit();
      return sizes;
    }catch (e){
      await transaction.rollback();
      throw e;
    }
  }

  async get(id: number) {
    const transaction = await this.sequelizeInstance.transaction();

    try{
      const size = await this.sizeRepository.findByPk(id, { include: [Age] });
      await transaction.commit();
      return size;
    }catch (e){
      await transaction.rollback();
      throw e;
    }

  }
  async create(dto: CreateSizeDto, person: Person) {
    const transaction = await this.sequelizeInstance.transaction();

    try{
      const size = await this.sizeRepository.create(dto);

      const historyDto: CreateHistoryDto = new CreateHistoryDto(
          Actions.POST,
          person.id,
          tableName,
          `Создана запись с полями ${dto.number}`)
      await this.historyService.create(historyDto, transaction)
      await transaction.commit();
      return size;
    }catch (e){
      await transaction.rollback();
      throw e;
    }
  }

  async update(id: number, dto: CreateSizeDto, person: Person) {
    const transaction = await this.sequelizeInstance.transaction();

    try{
      await this.sizeRepository.update(dto, { where: { id: id }, transaction});
      const historyDto: CreateHistoryDto = new CreateHistoryDto(
          Actions.UPDATE,
          person.id,
          tableName,
          `Обновлена запись с полями ${id} ${dto.number}`)
      await this.historyService.create(historyDto, transaction)
      await transaction.commit();
      return this.get(id);
    }catch (e){
      await transaction.rollback();
      throw e;
    }

  }

  async delete(id: number, person: Person) {
    const transaction = await this.sequelizeInstance.transaction();

    try{
      await this.get(id);
      await this.sizeRepository.destroy({ where: { id: id },transaction });
      const historyDto: CreateHistoryDto = new CreateHistoryDto(
          Actions.DELETE,
          person.id,
          tableName,
          `Удалена запись с id = ${id}`);
      await this.historyService.create(historyDto, transaction);
      await transaction.commit();
      return { status: 200, message: `Object with ${id} will be destroyed` };
    } catch (e){
      await transaction.rollback();
      throw e;
    }
  }
}
