import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventSchedulesComponent } from './edit-event-schedules.component';

describe('EditEventSchedulesComponent', () => {
  let component: EditEventSchedulesComponent;
  let fixture: ComponentFixture<EditEventSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
