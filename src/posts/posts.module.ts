import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import {PostsController} from "./posts.controller";
import {Post} from "./posts.model";

@Module({
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
