import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventMediaComponent } from './edit-event-media.component';

describe('EditEventMediaComponent', () => {
  let component: EditEventMediaComponent;
  let fixture: ComponentFixture<EditEventMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
