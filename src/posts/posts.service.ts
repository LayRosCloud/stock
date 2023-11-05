import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import Post, {tableName} from "./posts.model";
import {HistoriesService} from "../histories/histories.service";
import {Sequelize, Transaction} from "sequelize";
import {Person} from "../persons/persons.model";
import {CreateHistoryDto} from "../histories/dto/create-history.dto";
import {Actions} from "../actions/action.model";
import {CreatePostDto} from "./dto/create-post.dto";

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post)
                private readonly postsRepository: typeof Post,

                private readonly historyService: HistoriesService,
                @InjectConnection()
                private readonly sequelizeInstance: Sequelize
    ){}

    async getAll(){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            const posts = await this.postsRepository.findAll({transaction});

            await transaction.commit();
            return posts;
        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async get(id: number){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const post =  await this.postsRepository.findByPk(id, {transaction});
            if(!post){
                throw new NotFoundException(`Error! Object with id ${id} not found`);
            }
            await transaction.commit();

            return post;
        }catch (e){
            await transaction.rollback();
            throw e;
        }
    }
    async getByValue(name: string, transaction: Transaction){

        const post =  await this.postsRepository.findOne({where: {name}, transaction});
        if(!post){
            throw new NotFoundException(`Error! Object with name ${name} not found`);
        }
        return post;
    }
    async create(dto: CreatePostDto, person: Person){

        const transaction = await this.sequelizeInstance.transaction();

        try{
            const post = await this.postsRepository.create(dto, {transaction});
            const historyDto: CreateHistoryDto = new CreateHistoryDto(
                Actions.POST,
                person.id,
                tableName,
                `Создана запись с полями ${dto.name}`)
            await this.historyService.create(historyDto, transaction)
            await transaction.commit();

            return post;

        }catch (e){
            await transaction.rollback();
            throw e;
        }

    }

    async update(id: number, dto: CreatePostDto, person: Person){
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.postsRepository.update(dto, {where: {id},transaction});
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

    async delete(id: number,person: Person){
        await this.get(id)
        const transaction = await this.sequelizeInstance.transaction();

        try{
            await this.postsRepository.destroy({where: {id: id}, transaction});
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
