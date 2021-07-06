import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsByCategoryComponent } from './events-by-category.component';

describe('EventsByCategoryComponent', () => {
  let component: EventsByCategoryComponent;
  let fixture: ComponentFixture<EventsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
