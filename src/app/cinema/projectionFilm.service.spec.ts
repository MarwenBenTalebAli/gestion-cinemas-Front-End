/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectionFilmService } from './projectionFilm.service';

describe('Service: ProjectionFilm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectionFilmService]
    });
  });

  it('should ...', inject([ProjectionFilmService], (service: ProjectionFilmService) => {
    expect(service).toBeTruthy();
  }));
});
