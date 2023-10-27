import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreatePersonDto} from './dto/create-person.dto';
import {InjectModel} from '@nestjs/sequelize';
import {Person} from './persons.model';
import * as bcrypt from 'bcrypt';
import {LoginPersonDto} from "./dto/login-person.dto";
import {GetterPersonDto} from "./dto/getter-person.dto";
import {PostsService} from "../posts/posts.service";
import Post from "../posts/posts.model";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class PersonsService {

    constructor(@InjectModel(Person) private readonly personRepository: typeof Person,
                private readonly postsService: PostsService){}

    async getAll(): Promise<GetterPersonDto[]>{
        const persons: Person[] = await this.personRepository.findAll({include: [Post]});
        return persons.map(person => new GetterPersonDto(person));
    }

    async getByEmail(email: string): Promise<Person>{
        const person: Person = await this.personRepository.findOne({include: [Post]});
        if(!person){
            throw new BadRequestException('Error! Person with this email not found')
        }
        return person;
    }

    async get(id: number){
        const person = await this.personRepository.findByPk(id, {include: [Post]});
        if(!person){
            throw new NotFoundException(`Error! Object Person with id ${id} not found!`);
        }

        return new GetterPersonDto(person);
    }

    async register(dto: CreatePersonDto){
        dto.password = await bcrypt.hash(dto.password, 4)

        const person: Person = await this.personRepository.create(dto, {include: [Post]});
        const post: Post = await this.postsService.getByValue('EMPLOYEE');

        await person.$set('posts', [post.id]);

        person.posts.push(post)

        return person;
    }

    async login(dto: LoginPersonDto){
        const person = await this.personRepository.findOne({where: {email: dto.email}, include: [Post]})

        if(!person){
            throw new NotFoundException(`Error! Person with email ${dto.email}!`);
        }
        const isMatch = await bcrypt.compare(dto.password, person.password);

        if(!isMatch){
            throw new NotFoundException(`Error! Person with password is incorrect!`);
        }
        return person;
    }

    async update(id: number, dto: CreatePersonDto){
        dto.password = await bcrypt.hash(dto.password, 4);
        await this.personRepository.findOne({where: {email: dto.email}, include: [Post]})
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.personRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
