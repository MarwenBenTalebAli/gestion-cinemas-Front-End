export class Salle {
    // tslint:disable-next-line:variable-name
    public _links: any = {
        self: { href: '' },
        salle: { href: '' },
        cinema: { href: '' },
        places: { href: '' },
        projections: { href: ''}
    };
    constructor(
        public id: number,
        public name: string,
        public nombrePlaces: number,
        public  projections: any = null,
    ) { }
}

