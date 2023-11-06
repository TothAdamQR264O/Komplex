import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzamlaIntegracioComponent } from './szamla-integracio.component';

describe('SzamlaIntegracioComponent', () => {
  let component: SzamlaIntegracioComponent;
  let fixture: ComponentFixture<SzamlaIntegracioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SzamlaIntegracioComponent]
    });
    fixture = TestBed.createComponent(SzamlaIntegracioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
