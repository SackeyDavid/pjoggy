import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventNavbarComponent } from './create-event-navbar.component';

describe('CreateEventNavbarComponent', () => {
  let component: CreateEventNavbarComponent;
  let fixture: ComponentFixture<CreateEventNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
