import { Salle } from './salle.model';

export class ProjectionFilm {
    // tslint:disable-next-line:variable-name
    public _links: any = {
        self: { href: '' },
        projectionFilm: { href: '' },
        film: { href: '' },
        tickets: { href: '' },
        seance: { href: '' },
        salle: Salle,
    };
    constructor(
        public id: number,
        public prix: number,
        public salle: Salle,
        public tickets: any = null,
        public dateProjection: string,
        public film: any = null,
        public seance: any = null
    ) { }
}
