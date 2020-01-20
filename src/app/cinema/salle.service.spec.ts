/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SalleService } from './salle.service';

describe('Service: Salle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalleService]
    });
  });

  it('should ...', inject([SalleService], (service: SalleService) => {
    expect(service).toBeTruthy();
  }));
});
