import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularEventsComponent } from './popular-events.component';

describe('PopularEventsComponent', () => {
  let component: PopularEventsComponent;
  let fixture: ComponentFixture<PopularEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
