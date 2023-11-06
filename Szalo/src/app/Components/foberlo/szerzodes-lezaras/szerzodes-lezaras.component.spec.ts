import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzerzodesLezarasComponent } from './szerzodes-lezaras.component';

describe('SzerzodesLezarasComponent', () => {
  let component: SzerzodesLezarasComponent;
  let fixture: ComponentFixture<SzerzodesLezarasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SzerzodesLezarasComponent]
    });
    fixture = TestBed.createComponent(SzerzodesLezarasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
