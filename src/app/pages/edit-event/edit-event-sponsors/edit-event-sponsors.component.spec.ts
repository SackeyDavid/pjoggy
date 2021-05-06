import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventSponsorsComponent } from './edit-event-sponsors.component';

describe('EditEventSponsorsComponent', () => {
  let component: EditEventSponsorsComponent;
  let fixture: ComponentFixture<EditEventSponsorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventSponsorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
