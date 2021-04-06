import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventTicketingComponent } from './edit-event-ticketing.component';

describe('EditEventTicketingComponent', () => {
  let component: EditEventTicketingComponent;
  let fixture: ComponentFixture<EditEventTicketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventTicketingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventTicketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
