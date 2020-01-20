
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import { Ville } from './ville.model';
import { Cinema } from './cinema.model';
import { Subject } from 'rxjs/Subject';
import { Salle } from './salle.model';
import { ProjectionFilm } from './projectionFilm.model';

@Injectable()
export class CinemaService {

    cinemasChanged = new Subject<Cinema[]>();

    cinemas: Cinema[] = [
        new Cinema(
            'Cinema 1',
            10
        ),
        new Cinema(
            'Cinema 2',
            10
        ),
        new Cinema(
            'Cinema 3',
            10
        )
        ,
        new Cinema(
            'Cinema 4',
            10
        )
    ];

    constructor(private httpClient: HttpClient) { }

    getCinemas(): Cinema[] {
        return this.cinemas.slice();
    }
    setCinemas(cinemas: Cinema[]) {
        this.cinemas = cinemas;
        this.cinemasChanged.next(this.cinemas.slice());
    }
}
