import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewOrganizerModalComponent } from './preview-organizer-modal.component';

describe('PreviewOrganizerModalComponent', () => {
  let component: PreviewOrganizerModalComponent;
  let fixture: ComponentFixture<PreviewOrganizerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewOrganizerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewOrganizerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
