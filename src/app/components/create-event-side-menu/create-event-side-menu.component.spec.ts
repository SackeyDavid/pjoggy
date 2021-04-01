import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventSideMenuComponent } from './create-event-side-menu.component';

describe('CreateEventSideMenuComponent', () => {
  let component: CreateEventSideMenuComponent;
  let fixture: ComponentFixture<CreateEventSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventSideMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
