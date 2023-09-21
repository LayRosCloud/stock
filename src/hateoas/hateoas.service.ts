import { Injectable } from '@nestjs/common';

@Injectable()
export class HateoasService {

    getAll(): Object[]{
        const links: Object[] = [{
            rel: 'links',
            link: '/',
        }]
        this.#add('users', links);
        this.#add('roles', links);
        return links;
    }

    #add(rel: string, links: Object[], version: string = 'v1'){
        links.push({
            rel,
            link: `/${version}/${rel}/`
        })
    }
}
