import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventDetailsComponent } from './edit-event-details.component';

describe('EditEventDetailsComponent', () => {
  let component: EditEventDetailsComponent;
  let fixture: ComponentFixture<EditEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
