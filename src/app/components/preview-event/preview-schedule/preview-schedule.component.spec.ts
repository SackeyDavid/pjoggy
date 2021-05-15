import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewScheduleComponent } from './preview-schedule.component';

describe('PreviewScheduleComponent', () => {
  let component: PreviewScheduleComponent;
  let fixture: ComponentFixture<PreviewScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
