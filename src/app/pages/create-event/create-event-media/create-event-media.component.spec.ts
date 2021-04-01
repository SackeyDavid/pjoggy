import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventMediaComponent } from './create-event-media.component';

describe('CreateEventMediaComponent', () => {
  let component: CreateEventMediaComponent;
  let fixture: ComponentFixture<CreateEventMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
