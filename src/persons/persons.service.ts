import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from './persons.model';
import * as bcrypt from 'bcrypt';
import {LoginPersonDto} from "./dto/login-person.dto";

@Injectable()
export class PersonsService {

    constructor(@InjectModel(Person) private readonly personRepository: typeof Person){}

    async getAll(){
        const persons = await this.personRepository.findAll();

        return persons;
    }

    async get(id: number){
        const person = await this.personRepository.findByPk(id);
        if(!person){
            throw new NotFoundException(`Error! Object Person with id ${id} not found!`);
        }
        return person;
    }

    async register(dto: CreatePersonDto){
        dto.password = await bcrypt.hash(dto.password, 4)
        const person = await this.personRepository.create(dto);
        return person;
    }

    async login(dto: LoginPersonDto){
        const person = await this.personRepository.findOne({where: {email: dto.email}})

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
        await this.personRepository.findOne({where: {email: dto.email}})
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.personRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
