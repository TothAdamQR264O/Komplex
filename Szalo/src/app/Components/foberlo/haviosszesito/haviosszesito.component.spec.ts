import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaviosszesitoComponent } from './haviosszesito.component';

describe('HaviosszesitoComponent', () => {
  let component: HaviosszesitoComponent;
  let fixture: ComponentFixture<HaviosszesitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HaviosszesitoComponent]
    });
    fixture = TestBed.createComponent(HaviosszesitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
