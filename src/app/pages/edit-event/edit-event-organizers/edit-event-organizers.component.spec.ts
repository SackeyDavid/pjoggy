import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventOrganizersComponent } from './edit-event-organizers.component';

describe('EditEventOrganizersComponent', () => {
  let component: EditEventOrganizersComponent;
  let fixture: ComponentFixture<EditEventOrganizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventOrganizersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventOrganizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
