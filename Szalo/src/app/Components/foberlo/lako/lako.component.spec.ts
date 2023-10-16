import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LakoComponent } from './lako.component';

describe('LakoComponent', () => {
  let component: LakoComponent;
  let fixture: ComponentFixture<LakoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LakoComponent]
    });
    fixture = TestBed.createComponent(LakoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
