import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventSponsorsComponent } from './create-event-sponsors.component';

describe('CreateEventSponsorsComponent', () => {
  let component: CreateEventSponsorsComponent;
  let fixture: ComponentFixture<CreateEventSponsorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventSponsorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
