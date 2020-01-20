import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import { Salle } from './salle.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SalleService {

  sallesChanged = new Subject<Salle[]>();

  salles: Salle[] = [
    new Salle(
      1,
      'Salle 1',
      10
    ),
    new Salle(
      2,
      'Salle 2',
      10
    ),
    new Salle(
      3,
      'Salle 3',
      10
    )
    ,
    new Salle(
      4,
      'Salle 4',
      10
    )
  ];

  constructor(private httpClient: HttpClient) { }
  getSalles(): Salle[] {
    return this.salles.slice();
  }
  setSalles(salles: Salle[]) {
    this.salles = salles;
    this.sallesChanged.next(this.salles.slice());
  }
}
