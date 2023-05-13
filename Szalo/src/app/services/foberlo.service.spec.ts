import { TestBed } from '@angular/core/testing';

import { FoberloService } from './foberlo.service';

describe('FoberloService', () => {
  let service: FoberloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoberloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
