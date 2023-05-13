import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzobaComponent } from './szoba.component';

describe('SzobaComponent', () => {
  let component: SzobaComponent;
  let fixture: ComponentFixture<SzobaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SzobaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SzobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
