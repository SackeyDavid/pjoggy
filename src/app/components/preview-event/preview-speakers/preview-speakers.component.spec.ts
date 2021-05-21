import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSpeakersComponent } from './preview-speakers.component';

describe('PreviewSpeakersComponent', () => {
  let component: PreviewSpeakersComponent;
  let fixture: ComponentFixture<PreviewSpeakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewSpeakersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
