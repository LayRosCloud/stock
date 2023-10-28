import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private jwtService: JwtService){

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try{
            const authorization: string = req.headers.authorization;
            const splittedTags: string[] = authorization.split(' ');

            const typeOfToken = splittedTags[0];
            const token = splittedTags[1];
            
            if(typeOfToken !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Person is not authorizated'});
            }
            
            const person = this.jwtService.verify(token);
            req.user = person;
            return true;
        }catch(e){
            console.log(e);
            throw new UnauthorizedException({message: 'Person is not authorizated'});
        }
    }

}