import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFooterComponent } from './event-footer.component';

describe('EventFooterComponent', () => {
  let component: EventFooterComponent;
  let fixture: ComponentFixture<EventFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
