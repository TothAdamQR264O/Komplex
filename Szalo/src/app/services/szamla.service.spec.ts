import { TestBed } from '@angular/core/testing';

import { SzamlaService } from './szamla.service';

describe('SzamlaService', () => {
  let service: SzamlaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SzamlaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
