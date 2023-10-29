import { Injectable } from '@nestjs/common';

@Injectable()
export class HateoasService {

    getAll(): Object[]{
        const links: Object[] = [{
            rel: 'links',
            link: '/',
        },
        {
            rel: 'docs',
            link: '/api/docs/'
        }]
        this.#add('persons', links);
        this.#add('posts', links);
        this.#add('permissions', links);
        this.#add('packages', links);
        this.#add('prices', links);
        this.#add('sizes', links);
        this.#add('parties', links);
        this.#add('models', links);
        this.#add('modelsizes', links);
        this.#add('operations', links);
        this.#add('auth', links);
        this.#add('clothoperations', links);
        this.#add('ages', links);
        return links;
    }

    #add(rel: string, links: Object[], version: string = 'v1'){
        links.push({
            rel,
            link: `/${version}/${rel}/`
        })
    }
}
