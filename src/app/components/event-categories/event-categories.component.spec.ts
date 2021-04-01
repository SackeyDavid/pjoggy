import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCategoriesComponent } from './event-categories.component';

describe('EventCategoriesComponent', () => {
  let component: EventCategoriesComponent;
  let fixture: ComponentFixture<EventCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
