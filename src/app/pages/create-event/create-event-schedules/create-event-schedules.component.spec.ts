import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventSchedulesComponent } from './create-event-schedules.component';

describe('CreateEventSchedulesComponent', () => {
  let component: CreateEventSchedulesComponent;
  let fixture: ComponentFixture<CreateEventSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
