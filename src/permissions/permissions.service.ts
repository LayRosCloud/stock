import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Permission} from "./permissions.model";
import {CreatePermissionDto} from "./dto/create-permission.dto";

@Injectable()
export class PermissionsService {
    constructor(@InjectModel(Permission) private readonly permissionRepository: typeof Permission){}

    async getAll(){
        const permissions = await this.permissionRepository.findAll();

        return permissions;
    }

    async get(id: number){
        const permission =  await this.permissionRepository.findByPk(id);

        return permission;
    }

    async create(dto: CreatePermissionDto){
        const permission = await this.permissionRepository.create(dto);
        return permission;
    }

    async update(id: number, dto: CreatePermissionDto){
        await this.permissionRepository.update(dto, {where: {id: id}});
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.permissionRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
