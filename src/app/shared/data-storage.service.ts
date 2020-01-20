import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import { VilleService } from '../cinema/ville.service';
import { CinemaService } from '../cinema/cinema.service';

import { Ville } from '../cinema/ville.model';
import { Cinema } from '../cinema/cinema.model';
import { Salle } from '../cinema/salle.model';
import { SalleService } from '../cinema/salle.service';
import { ProjectionFilm } from '../cinema/projectionFilm.model';
import { ProjectionFilmService } from '../cinema/projectionFilm.service';
import { Observable } from 'rxjs/Observable';
import { Ticket } from '../cinema/ticket.model';

@Injectable()
export class DataStorageService {

    public host = 'http://localhost:8080';

    constructor(
        private httpClient: HttpClient,
        private villeService: VilleService,
        private salleService: SalleService,
        private cinemaService: CinemaService,
        private projectionFilmService: ProjectionFilmService
    ) {

    }

    getVilles(): void {
        this.httpClient.get<Ville[]>(
            this.host + '/villes',
            {
                observe: 'body',
                responseType: 'json'
            }
        )
            .map(
                (villes) => {
                    return villes;
                }
            )
            .subscribe(
                (data: any) => {
                    this.villeService.setVilles(data._embedded.villes);
                }
            );
    }

    getCinemas(ville: Ville): void {
        this.httpClient.get<Cinema[]>(
            ville._links.cinemas.href,
            {
                observe: 'body',
                responseType: 'json'
            }
        )
            .map(
                (cinemas) => {
                    return cinemas;
                }
            )
            .subscribe(
                (data: any) => {
                    this.cinemaService.setCinemas(data._embedded.cinemas);
                }
            );
    }

    getSalles(cinema: Cinema): void {
        const url = cinema._links.salles.href;
        this.httpClient.get<Salle[]>(
            url,
            {
                observe: 'body',
                responseType: 'json'
            }
        )
            .map(
                (cinemas) => {
                    return cinemas;
                }
            )
            .subscribe(
                (dataCinema: any) => {
                    this.salleService.setSalles(dataCinema._embedded.salles);
                    this.salleService.getSalles().forEach(salle => {
                        this.getProjectionsFilmBySalle(salle).subscribe(
                            (dataSalle: any) => {
                                salle.projections = dataSalle;
                            }
                        );
                    });
                }
            );
    }

    getProjectionsFilmBySalle(salle: Salle): Observable<Salle[]> {
        const url = salle._links.projections.href.replace('{?projection}', '');
        return this.httpClient.get<Salle[]>(
            url + '?projection=p1',
            {
                observe: 'body',
                responseType: 'json'
            }
        )
            .map(
                (projectionFilms) => {
                    return projectionFilms;
                }
            );
        /*.subscribe(
            (data: any) => {
                this.projectionFilmService.setProjectionsFilm(data._embedded.projectionFilms);
            }
        );*/
    }

    getProjectionsFilmByProjectionFilm(projectionFilm: ProjectionFilm): void {
        const url = projectionFilm._links.tickets.href.replace('{?projection}', '');
        this.httpClient.get<Ticket[]>(
            url + '?projection=p2',
            {
                observe: 'body',
                responseType: 'json'
            }
        )
            .map(
                (cinemas) => {
                    return cinemas;
                }
            )
            .subscribe(
                (dataTickets: any) => {
                    this.projectionFilmService.setProjectionsFilm(dataTickets._embedded.tickets);
                }
            );
    }

    payerTickets(ticketFormData) {
        const req = new HttpRequest(
            'POST',
            this.host + '/payerTickets',
            ticketFormData,
            { reportProgress: true }
        );
        return this.httpClient.request(req);
    }
}
