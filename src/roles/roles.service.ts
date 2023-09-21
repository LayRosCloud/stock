import {Injectable, NotFoundException} from '@nestjs/common';
import {Role} from "./roles.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private readonly roleRepository: typeof Role) {}

    async getAll(): Promise<Role[]> {
        return this.roleRepository.findAll()
    }

    async get(title: string): Promise<Role> {
        const role: Role = await this.roleRepository.findOne({
            where: {title}
        });

        if(!role){
            throw new NotFoundException('Role is not found!');
        }

        return role;
    }

    async create(dto: CreateRoleDto): Promise<Role>{
        const newRole: Role = await this.roleRepository.create(dto);
        return newRole;
    }
}
