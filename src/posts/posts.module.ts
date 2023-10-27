import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Post from './posts.model';
import { Person } from 'src/persons/persons.model';
import { Permission } from 'src/permissions/permissions.model';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([Post, Person, Permission])
  ],
  exports: [
      PostsService
  ]
})
export class PostsModule {}
