import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisztralasComponent } from './regisztralas.component';

describe('RegisztralasComponent', () => {
  let component: RegisztralasComponent;
  let fixture: ComponentFixture<RegisztralasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisztralasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisztralasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
