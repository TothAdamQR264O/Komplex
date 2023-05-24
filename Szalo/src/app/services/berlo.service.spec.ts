import { TestBed } from '@angular/core/testing';

import { BerloService } from './berlo.service';

describe('BerloService', () => {
  let service: BerloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BerloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
