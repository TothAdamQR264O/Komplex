import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzerzodesComponent } from './szerzodes.component';

describe('SzerzodesComponent', () => {
  let component: SzerzodesComponent;
  let fixture: ComponentFixture<SzerzodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SzerzodesComponent]
    });
    fixture = TestBed.createComponent(SzerzodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
