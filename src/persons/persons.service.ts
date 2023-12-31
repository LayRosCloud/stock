import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePersonDto } from "./dto/create-person.dto";
import { InjectConnection, InjectModel } from "@nestjs/sequelize";
import { Person, tableName } from "./persons.model";
import * as bcrypt from "bcrypt";
import { LoginPersonDto } from "./dto/login-person.dto";
import { GetterPersonDto } from "./dto/getter-person.dto";
import { PostsService } from "../posts/posts.service";
import Post from "../posts/posts.model";
import { Op, Sequelize, Transaction } from "sequelize";
import sequelize from "sequelize";
import { HistoriesService } from "../histories/histories.service";
import { Actions } from "../actions/action.model";
import { CreateHistoryDto } from "../histories/dto/create-history.dto";

@Injectable()
export class PersonsService {
  constructor(
    @InjectModel(Person)
    private readonly personRepository: typeof Person,
    private readonly postsService: PostsService,
    private readonly historyService: HistoriesService,
    @InjectConnection()
    private readonly sequelizeInstance: Sequelize
  ) {}

  async getAll(): Promise<GetterPersonDto[]> {
    const persons: Person[] = await this.personRepository.findAll({
      include: [Post],
      attributes: { exclude: ["password"] },
    });
    return persons;
  }

  async getByEmail(email: string): Promise<Person> {
    const person: Person = await this.personRepository.findOne({
      include: [Post],
      where: { email },
    });
    return person;
  }

  async get(id: number) {
    const person = await this.personRepository.findByPk(id, {
      include: [Post],
      attributes: { exclude: ["password"] },
    });
    if (!person) {
      throw new NotFoundException(
        `Error! Object Person with id ${id} not found!`
      );
    }

    return person;
  }

  async register(dto: CreatePersonDto) {
    let person: Person;

    const transaction: Transaction = await this.sequelizeInstance.transaction();
    const finded = await this.personRepository.findOne({
      where: { [Op.or]: [{ uid: dto.uid }, { email: dto.email }] },
      transaction,
    });
    try {
      if (finded) {
        throw new BadRequestException("Ошибка! такой пользователь существует!");
      }
      dto.password = await bcrypt.hash(dto.password, 4);

      person = await this.personRepository.create(dto, {
        include: [Post],
        transaction,
      });
      const post: Post = await this.postsService.getByValue(
        "EMPLOYEE",
        transaction
      );

      await person.$set("posts", [post.id], { transaction });
      person.posts = [post];
      await this.historyService.create(
        new CreateHistoryDto(
          Actions.POST,
          person.id,
          tableName,
          "Пользователь зарегистрировался"
        ),
        transaction
      );
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }

    return person;
  }

  async login(dto: LoginPersonDto) {
    const transaction = await this.sequelizeInstance.transaction();
    try {
      const person = await this.personRepository.findOne({
        where: { email: dto.email },
        include: [Post],
      });

      if (!person) {
        throw new NotFoundException(`Error! Person with email ${dto.email}!`);
      }
      const isMatch = await bcrypt.compare(dto.password, person.password);

      if (!isMatch) {
        throw new NotFoundException(
          `Error! Person with password is incorrect!`
        );
      }
      await this.historyService.create(
        new CreateHistoryDto(
          Actions.POST,
          person.id,
          tableName,
          "Пользователь авторизовался"
        ),
        transaction
      );
      await transaction.commit();
      return person;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async update(id: number, dto: CreatePersonDto) {
    dto.password = await bcrypt.hash(dto.password, 4);
    await this.personRepository.update(dto, { where: { id: id } });
    return this.get(id);
  }

  async delete(id: number) {
    await this.get(id);
    await this.personRepository.destroy({ where: { id: id } });
    return { status: 200, message: `Object with ${id} will be destroyed` };
  }
}
