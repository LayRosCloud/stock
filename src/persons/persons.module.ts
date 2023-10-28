import { Module, forwardRef } from '@nestjs/common';
import { PersonsService } from "./persons.service";
import { PersonsController } from "./persons.controller";
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './persons.model';
import Post from 'src/posts/posts.model';
import { Permission } from 'src/permissions/permissions.model';
import {PostsModule} from "../posts/posts.module";
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers: [PersonsService],
    controllers: [PersonsController],
    imports: [
        SequelizeModule.forFeature([Person, Post, Permission]),
        PostsModule,
        forwardRef(()=>AuthModule)
    ],
    exports:[
        PersonsService,
    ]
})
export class PersonsModule {}
