import {Injectable, NotFoundException} from '@nestjs/common';
import {WorkingPerson} from "./working-person.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class WorkingPersonService {

    constructor(@InjectModel(WorkingPerson) private readonly workingPersonRepository: typeof WorkingPerson) {
    }

    async getAll(): Promise<WorkingPerson[]>{
        const workingPersons = this.workingPersonRepository.findAll()
        return workingPersons;
    }

    async get(id: number): Promise<WorkingPerson>{
        const workingPerson = this.workingPersonRepository.findByPk(id)

        if(!workingPerson){
            throw new NotFoundException(`Not found element with id ${id}`)
        }

        return workingPerson;
    }
}
