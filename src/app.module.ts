import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./user-roles/user-roles.model";
import { HateoasService } from './hateoas/hateoas.service';
import { HateoasController } from './hateoas/hateoas.controller';
import { HateoasModule } from './hateoas/hateoas.module';
import { AuthModule } from './auth/auth.module';


@Module({
    controllers: [HateoasController],
    providers: [HateoasService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_TABLE_NAME,
            models: [User, Role, UserRoles],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        HateoasModule,
        AuthModule,
    ]
})
export class AppModule{}