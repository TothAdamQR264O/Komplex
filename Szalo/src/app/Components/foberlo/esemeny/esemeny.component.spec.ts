import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsemenyComponent } from './esemeny.component';

describe('EsemenyComponent', () => {
  let component: EsemenyComponent;
  let fixture: ComponentFixture<EsemenyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsemenyComponent]
    });
    fixture = TestBed.createComponent(EsemenyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
