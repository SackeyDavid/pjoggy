import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventPublishComponent } from './create-event-publish.component';

describe('CreateEventPublishComponent', () => {
  let component: CreateEventPublishComponent;
  let fixture: ComponentFixture<CreateEventPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventPublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
