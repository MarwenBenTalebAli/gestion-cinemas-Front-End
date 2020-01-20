
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Salle } from './salle.model';
import { ProjectionFilm } from './projectionFilm.model';


@Injectable()
export class ProjectionFilmService {


  projectionsFilmChanged = new Subject<ProjectionFilm[]>();

  projectionsFilm: ProjectionFilm[] = [
    new ProjectionFilm(
      1,
      20,
      new Salle(1, 'S1', 24),
      [],
      '2020-01-18T12:47:05.000+0000'
    )
  ];

  constructor(private httpClient: HttpClient) { }

  getProjectionsFilm(): ProjectionFilm[] {
    return this.projectionsFilm;
  }

  setProjectionsFilm(projectionsFilm: ProjectionFilm[]) {
    this.projectionsFilm = projectionsFilm;
    this.projectionsFilmChanged.next(this.projectionsFilm.slice());
  }
}
