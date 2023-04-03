import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerloComponent } from './berlo.component';

describe('BerloComponent', () => {
  let component: BerloComponent;
  let fixture: ComponentFixture<BerloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BerloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BerloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
