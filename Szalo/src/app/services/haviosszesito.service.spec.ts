import { TestBed } from '@angular/core/testing';

import { HaviosszesitoService } from './haviosszesito.service';

describe('HaviosszesitoService', () => {
  let service: HaviosszesitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HaviosszesitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
