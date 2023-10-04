import { TestBed } from '@angular/core/testing';

import { JelentkezService } from './jelentkez.service';

describe('JelentkezService', () => {
  let service: JelentkezService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JelentkezService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
