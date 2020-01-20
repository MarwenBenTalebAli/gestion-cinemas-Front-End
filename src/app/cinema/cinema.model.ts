export class Cinema {
    // tslint:disable-next-line:variable-name
    public _links: any = {
        self: { href: '' },
        cinema: { href: '' },
        ville: { href: '' },
        salles: { href: '' }
    };
    constructor(
        public name: string,
        public nombreSalles: number
    ) { }
}
