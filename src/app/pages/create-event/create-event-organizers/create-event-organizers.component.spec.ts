import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventOrganizersComponent } from './create-event-organizers.component';

describe('CreateEventOrganizersComponent', () => {
  let component: CreateEventOrganizersComponent;
  let fixture: ComponentFixture<CreateEventOrganizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventOrganizersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventOrganizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
