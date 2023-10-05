import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JelentkezokComponent } from './jelentkezok.component';

describe('JelentkezokComponent', () => {
  let component: JelentkezokComponent;
  let fixture: ComponentFixture<JelentkezokComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JelentkezokComponent]
    });
    fixture = TestBed.createComponent(JelentkezokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
