import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoberloComponent } from './foberlo.component';

describe('FoberloComponent', () => {
  let component: FoberloComponent;
  let fixture: ComponentFixture<FoberloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoberloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoberloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
