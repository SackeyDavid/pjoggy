import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventSpeakersComponent } from './create-event-speakers.component';

describe('CreateEventSpeakersComponent', () => {
  let component: CreateEventSpeakersComponent;
  let fixture: ComponentFixture<CreateEventSpeakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventSpeakersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
