import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Party} from "./parties.model";
import {CreatePartyDto} from "./dto/create-party.dto";

@Injectable()
export class PartiesService {
    constructor(@InjectModel(Party) private readonly partyRepository: typeof Party){}

    async getAll(){
        const parties = await this.partyRepository.findAll();

        return parties;
    }

    async get(id: number){
        const party =  await this.partyRepository.findByPk(id);

        return party;
    }

    async create(dto: CreatePartyDto){
        const party = await this.partyRepository.create(dto);
        return party;
    }

    async update(id: number, dto: CreatePartyDto){
        await this.partyRepository.update(dto, {where: {id: id}});
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.partyRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
