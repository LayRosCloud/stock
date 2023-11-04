import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { POSTS_KEY } from "./roles.decorator";
import Post from "src/posts/posts.model";
import { Person } from "src/persons/persons.model";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService,
        private readonly reflector: Reflector){

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{

        try{
            const req = context.switchToHttp().getRequest();
            const requiredPosts: string[] = this.reflector.getAllAndOverride(POSTS_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            
            if(!requiredPosts){
                return true;
            }

            const authorization: string = req.headers.authorization;
            const splittedTags: string[] = authorization.split(' ');

            const typeOfToken: string = splittedTags[0];
            const token: string = splittedTags[1];
            
            if(typeOfToken !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Person is not authorizated'});
            }
            
            const person: Person = this.jwtService.verify(token);
            req.user = person;
            return person.posts.some((post: Post) => requiredPosts.includes(post.name));
        }catch(e){
            throw new UnauthorizedException({message: 'Person is not authorizated'});
        }
    }
}