import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JelentkezesLetrehozasaComponent } from './jelentkezes-letrehozasa.component';

describe('JelentkezesLetrehozasaComponent', () => {
  let component: JelentkezesLetrehozasaComponent;
  let fixture: ComponentFixture<JelentkezesLetrehozasaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JelentkezesLetrehozasaComponent]
    });
    fixture = TestBed.createComponent(JelentkezesLetrehozasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
