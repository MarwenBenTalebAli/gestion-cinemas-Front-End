import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Ville } from './ville.model';
import { Cinema } from './cinema.model';
import { Salle } from './salle.model';
import { VilleService } from './ville.service';
import { CinemaService } from './cinema.service';
import { DataStorageService } from '../shared/data-storage.service';
import { SalleService } from './salle.service';
import { ProjectionFilm } from './projectionFilm.model';
import { ProjectionFilmService } from './projectionFilm.service';
import { Ticket } from './ticket.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.scss']
})
export class CinemaComponent implements OnInit, OnDestroy {

  villes: Ville[];
  cinemas: Cinema[];
  salles: Salle[];
  projectionsFilma: ProjectionFilm[];
  selectedTickets: Ticket[];

  public currentVille: Ville;
  public currentCinema: Cinema;
  public currentProjectionFilm: ProjectionFilm;

  villeSubscription: Subscription;
  cinemaSubscription: Subscription;
  salleSubscription: Subscription;
  projectionFilmSubscription: Subscription;

  @ViewChild('f') ticketForm: NgForm;

  ticketFormData = {
    nomClient: '',
    codePayement: 0,
    tickets: Array<number>()
  };

  submitted = false;

  constructor(
    private villeService: VilleService,
    private cinemaService: CinemaService,
    private salleService: SalleService,
    private projectionFilmService: ProjectionFilmService,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.villeSubscription = this.villeService.villesChanged.subscribe(
      (villes: Ville[]) => {
        this.villes = villes;
      }
    );
    this.villes = this.villeService.getVilles();
    this.onFetchVillesData();

    this.cinemaSubscription = this.cinemaService.cinemasChanged.subscribe(
      (dataCinemas: any) => {
        this.cinemas = dataCinemas;
      }
    );

    this.salleSubscription = this.salleService.sallesChanged.subscribe(
      (dataSalles: any) => {
        this.salles = dataSalles;
      }
    );

    this.projectionFilmSubscription = this.projectionFilmService.projectionsFilmChanged.subscribe(
      (dataProjectionsFilm: any) => {
        this.currentProjectionFilm.tickets = dataProjectionsFilm;
        this.selectedTickets = [];
      }
    );
  }

  onFetchVillesData() {
    this.dataStorageService.getVilles();
  }

  onGetCinemas(ville: Ville) {
    this.currentVille = ville;
    this.salles = undefined;
    this.dataStorageService.getCinemas(ville);
  }
  onGetSalles(cinema: Cinema) {
    this.currentCinema = cinema;
    this.dataStorageService.getSalles(cinema);
  }

  getImageFilmUrl(salle: Salle): string {
    return this.dataStorageService.host + '/imageFilm/' + salle.projections._embedded.projectionFilms[1].film.id;
  }

  onGetTicketPlaces(projectionFilm: ProjectionFilm) {
    this.currentProjectionFilm = projectionFilm;
    this.dataStorageService.getProjectionsFilmByProjectionFilm(projectionFilm);
  }

  onSelectTicket(ticket: Ticket) {
    if (!ticket.selected) {
      ticket.selected = true;
      this.selectedTickets.push(ticket);
    } else {
      ticket.selected = false;
      this.selectedTickets.splice(this.selectedTickets.indexOf(ticket), 1);
    }
  }

  getTicketClass(ticket: Ticket): string {
    let str = 'btn ticket btn-large ';
    if (ticket.reserve === true) {
      str += 'btn-danger disabled';
    } else if (ticket.selected) {
      str += 'btn-warning';
    } else {
      str += 'btn-success';
    }
    return str;
  }

  onPayTickets() {
    this.submitted = true;
    this.ticketFormData.nomClient = this.ticketForm.value.ticketData.nomClient;
    this.ticketFormData.codePayement = this.ticketForm.value.ticketData.codePayement;
    const tickets = [];
    this.selectedTickets.forEach(selectedTicket => {
      tickets.push(selectedTicket.id);
    });
    this.ticketFormData.tickets = tickets;
    console.log('ticketFormData: ', this.ticketFormData);
    this.dataStorageService.payerTickets(this.ticketFormData).subscribe(
      data => {
        alert('Tickets Réservés avec succes!');
        this.onGetTicketPlaces(this.currentProjectionFilm);
      }
    );
  }

  ngOnDestroy() {
    this.villeSubscription.unsubscribe();
    this.cinemaSubscription.unsubscribe();
    this.salleSubscription.unsubscribe();
    this.projectionFilmSubscription.unsubscribe();
  }

}
