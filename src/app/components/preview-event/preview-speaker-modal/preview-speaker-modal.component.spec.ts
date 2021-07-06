import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSpeakerModalComponent } from './preview-speaker-modal.component';

describe('PreviewSpeakerModalComponent', () => {
  let component: PreviewSpeakerModalComponent;
  let fixture: ComponentFixture<PreviewSpeakerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewSpeakerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewSpeakerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
