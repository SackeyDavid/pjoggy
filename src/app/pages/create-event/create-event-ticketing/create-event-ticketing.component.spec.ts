import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventTicketingComponent } from './create-event-ticketing.component';

describe('CreateEventTicketingComponent', () => {
  let component: CreateEventTicketingComponent;
  let fixture: ComponentFixture<CreateEventTicketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventTicketingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventTicketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
