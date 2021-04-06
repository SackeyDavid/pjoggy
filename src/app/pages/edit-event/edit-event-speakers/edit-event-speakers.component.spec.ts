import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventSpeakersComponent } from './edit-event-speakers.component';

describe('EditEventSpeakersComponent', () => {
  let component: EditEventSpeakersComponent;
  let fixture: ComponentFixture<EditEventSpeakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventSpeakersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
