import {Injectable, NotFoundException} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/roles.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private readonly userRepository: typeof User,
                private readonly rolesService: RolesService) {}

    async getAll(): Promise<User[]>{
        return await this.userRepository.findAll({include: [Role]});
    }

    async get(id: String) : Promise<User>{
        const user: User = await this.userRepository.findByPk(+id);

        if(!user){
            throw new NotFoundException('User is not found')
        }

        return user;
    }

    async register(dto: CreateUserDto){
        const user: User = await this.userRepository.create(dto);
        const role: Role = await this.rolesService.get('user');
        await user.$set('roles', [role.id])
        return user;
    }

    async delete(id: string): Promise<Object>{
        await this.get(id)

        await this.userRepository.destroy({
                where: {id: +id}
            })
        return {status: 200, message: `Object with id ${id} is destroyed!`}
    }
}
