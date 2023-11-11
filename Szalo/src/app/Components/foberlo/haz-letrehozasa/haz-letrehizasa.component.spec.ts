import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzerkesztesComponent } from './haz-letrehozasa.component';

describe('SzerkesztesComponent', () => {
  let component: SzerkesztesComponent;
  let fixture: ComponentFixture<SzerkesztesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SzerkesztesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
