import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventsPageComponent } from './new-events-page.component';

describe('NewEventsPageComponent', () => {
  let component: NewEventsPageComponent;
  let fixture: ComponentFixture<NewEventsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEventsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
