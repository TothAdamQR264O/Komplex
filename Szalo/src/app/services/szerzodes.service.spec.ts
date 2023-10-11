import { TestBed } from '@angular/core/testing';

import { SzerzodesService } from './szerzodes.service';

describe('SzerzodesService', () => {
  let service: SzerzodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SzerzodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
