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

        return {
            token: this.generateToken(person).token,
            id: person.id,
            email: person.email,
            firstName: person.firstName,
            lastName: person.lastName,
            posts: person.posts
        }
    }

    async registration(personDto: CreatePersonDto){
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
