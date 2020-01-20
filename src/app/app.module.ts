import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CinemaComponent } from './cinema/cinema.component';
import { VilleService } from './cinema/ville.service';
import { CinemaService } from './cinema/cinema.service';
import { SalleService } from './cinema/salle.service';
import { ProjectionFilmService } from './cinema/projectionFilm.service';

import { DataStorageService } from './shared/data-storage.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    CinemaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    VilleService,
    CinemaService,
    SalleService,
    ProjectionFilmService,
    DataStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
