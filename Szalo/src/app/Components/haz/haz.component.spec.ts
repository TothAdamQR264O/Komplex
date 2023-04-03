import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazComponent } from './haz.component';

describe('HazComponent', () => {
  let component: HazComponent;
  let fixture: ComponentFixture<HazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
