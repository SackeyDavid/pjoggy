import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveEventsPageComponent } from './live-events-page.component';

describe('LiveEventsPageComponent', () => {
  let component: LiveEventsPageComponent;
  let fixture: ComponentFixture<LiveEventsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveEventsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
