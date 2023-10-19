import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreatePriceDto} from "./dto/create-price.dto";
import {Price} from "./prices.model";

@Injectable()
export class PricesService {
    constructor(@InjectModel(Price) private readonly priceRepository: typeof Price){}

    async getAll(){
        const prices = await this.priceRepository.findAll();

        return prices;
    }

    async get(id: number){
        const price =  await this.priceRepository.findByPk(id);

        return price;
    }

    async create(dto: CreatePriceDto){
        const price = await this.priceRepository.create(dto);
        return price;
    }

    async update(id: number, dto: CreatePriceDto){
        await this.priceRepository.update(dto, {where: {id: id}});
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.priceRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
