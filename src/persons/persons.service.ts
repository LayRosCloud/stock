import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from './persons.model';

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
        const person = await this.personRepository.create(dto);
        return person;
    }
}
