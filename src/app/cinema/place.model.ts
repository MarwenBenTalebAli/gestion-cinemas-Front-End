import { Salle } from './salle.model';
import { Ticket } from './ticket.model';

export class Place {

    constructor(
        public numero: number,
        public longitude: number,
        public latitude: number,
        public altitude: number,
        public salle: Salle,
        public tickets: Ticket[]
    ) { }
}
