import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularEventsPageComponent } from './popular-events-page.component';

describe('PopularEventsPageComponent', () => {
  let component: PopularEventsPageComponent;
  let fixture: ComponentFixture<PopularEventsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularEventsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
