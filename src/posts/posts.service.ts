import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateSizeDto} from "../sizes/dto/create-size.dto";
import Post from "./posts.model";
import {CreatePostDto} from "./dto/create-post.dto";

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private readonly postsRepository: typeof Post){}

    async getAll(){
        const posts = await this.postsRepository.findAll();

        return posts;
    }

    async get(id: number){
        const post =  await this.postsRepository.findByPk(id);

        return post;
    }

    async getByValue(name: string){
        const post =  await this.postsRepository.findOne({where: {name}});

        return post;
    }

    async create(dto: CreatePostDto){
        const post = await this.postsRepository.create(dto);
        return post;
    }

    async update(id: number, dto: CreatePostDto){
        await this.postsRepository.update(dto, {where: {id: id}});
        return this.get(id);
    }

    async delete(id: number){
        await this.get(id)
        await this.postsRepository.destroy({where: {id: id}});
        return {status: 200, message: `Object with ${id} will be destroyed`}
    }
}
