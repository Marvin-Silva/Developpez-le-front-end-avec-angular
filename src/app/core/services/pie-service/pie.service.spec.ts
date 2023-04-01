import { TestBed } from '@angular/core/testing';

import { PieService } from './pie.service';

describe('OlympicService', () => {
  let service: PieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
