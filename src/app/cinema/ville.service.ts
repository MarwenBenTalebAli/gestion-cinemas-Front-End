import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import { Ville } from './ville.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class VilleService {

    villesChanged = new Subject<Ville[]>();

    villes: Ville[] = [
        new Ville(
            'Ville 1'
        ),
        new Ville(
            'Ville 2'
        ),
        new Ville(
            'Ville 3'
        )
        ,
        new Ville(
            'Ville 4'
        )
    ];

    constructor(private httpClient: HttpClient) {
    }

    getVilles(): Ville[] {
        return this.villes.slice();
    }

    setVilles(villes: Ville[]) {
        this.villes = villes;
        this.villesChanged.next(this.villes.slice());
    }
    /*getExperience(index: number) {
        return this.experiences[index];
    }

    getExperiences(): Experience[] {
        return this.experiences.slice();
    }

    addExperience(experience: Experience) {
        this.experiences.push(experience);
        this.experiencesChanged.next(this.experiences.slice());
        const req = new HttpRequest(
            'PUT',
            'https://resume-profile.firebaseio.com/experiences.json',
            experience, { reportProgress: true }
        );
        return this.httpClient.request(req);
    }

    updateExperience(index: number, newExperience: Experience) {
        this.experiences[index] = newExperience;
        this.experiencesChanged.next(this.experiences.slice());
        const req = new HttpRequest(
            'PATCH',
            'https://resume-profile.firebaseio.com/experiences.json',
            newExperience, { reportProgress: true }
        );
        return this.httpClient.request(req);
    }

    deleteExperience(index: number) {
        this.experiences.splice(index, 1);
        this.experiencesChanged.next(this.experiences.slice());
        const req = new HttpRequest(
            'DELETE',
            'https://resume-profile.firebaseio.com/experiences.json',
            this.experiences[index], { reportProgress: true }
        );
        return this.httpClient.request(req);
    }*/
}
