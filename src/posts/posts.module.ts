import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Post from './posts.model';
import { Person } from 'src/persons/persons.model';
import { Permission } from 'src/permissions/permissions.model';
import { AuthModule } from 'src/auth/auth.module';
import {HistoriesModule} from "../histories/histories.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([Post, Person, Permission]),
    AuthModule,
    HistoriesModule
  ],
  exports: [
      PostsService
  ]
})
export class PostsModule {}
