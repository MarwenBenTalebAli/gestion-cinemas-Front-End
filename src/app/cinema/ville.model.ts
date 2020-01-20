export class Ville {
    // tslint:disable-next-line:variable-name
    _links: any = {
        self: { href: '' },
        ville: { href: '' },
        cinemas: { href: '' }
    };
    constructor(
        public name: string
    ) { }
}

