import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveEventsComponent } from './live-events.component';

describe('LiveEventsComponent', () => {
  let component: LiveEventsComponent;
  let fixture: ComponentFixture<LiveEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
