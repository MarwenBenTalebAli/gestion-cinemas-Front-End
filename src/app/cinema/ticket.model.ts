import { ProjectionFilm } from './projectionFilm.model';
import { Place } from './place.model';

export class Ticket {
    id: number;
    // tslint:disable-next-line:variable-name
    _links: any = {
        self: { href: '' },
        ville: { href: '' },
        cinemas: { href: '' }
    };
    selected = false;

    constructor(
        public nomClient: string,
        public prix: number,
        public codePayement: number,
        public reserve: boolean,
        public place: Place = null,
        public projectionFilm: ProjectionFilm = null,
    ) { }
}
