import { BadRequestException, Injectable } from '@nestjs/common';
import {PersonsService} from "../persons/persons.service";
import {JwtService} from "@nestjs/jwt";
import {CreatePersonDto} from "../persons/dto/create-person.dto";
import {Person} from "../persons/persons.model";
import * as bcrypt from 'bcrypt';
import {LoginPersonDto} from "../persons/dto/login-person.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly personsService: PersonsService,
        private readonly jwtService: JwtService) {}

    async login(dto: LoginPersonDto){
        const person: Person = await this.validateToken(dto);

        return this.generateToken(person)
    }

    async registration(personDto: CreatePersonDto){
        const personFounded = await this.personsService.getByEmail(personDto.email);
        if(personFounded){
            throw new BadRequestException('Error! User with email has in db')
        }
        const person = await this.personsService.register(personDto)

        return this.generateToken(person)
    }

    private generateToken(person: Person){
        const payload: Object = {id: person.id, email: person.email, posts: person.posts}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateToken(personDto: LoginPersonDto): Promise<Person>{
        const person: Person = await this.personsService.login(personDto);
        return person;
    }
}
