import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventDetailsComponent } from './create-event-details.component';

describe('CreateEventDetailsComponent', () => {
  let component: CreateEventDetailsComponent;
  let fixture: ComponentFixture<CreateEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
