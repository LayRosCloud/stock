import { Module } from '@nestjs/common';
import { PersonsService } from "./persons.service";
import { PersonsController } from "./persons.controller";
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './persons.model';
import Post from 'src/posts/posts.model';
import { Permission } from 'src/permissions/permissions.model';

@Module({
    providers: [PersonsService],
    controllers: [PersonsController],
    imports: [
        SequelizeModule.forFeature([Person, Post, Permission])
    ]
})
export class PersonsModule {}
