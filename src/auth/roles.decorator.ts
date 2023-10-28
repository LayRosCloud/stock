import { SetMetadata } from "@nestjs/common";

export const POSTS_KEY = 'posts';

export const  Roles = (...roles: string[]) => SetMetadata(POSTS_KEY, roles)