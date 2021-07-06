import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEventsPageComponent } from './category-events-page.component';

describe('CategoryEventsPageComponent', () => {
  let component: CategoryEventsPageComponent;
  let fixture: ComponentFixture<CategoryEventsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryEventsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
