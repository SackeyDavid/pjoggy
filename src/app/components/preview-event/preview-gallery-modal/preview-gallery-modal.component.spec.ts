import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewGalleryModalComponent } from './preview-gallery-modal.component';

describe('PreviewGalleryModalComponent', () => {
  let component: PreviewGalleryModalComponent;
  let fixture: ComponentFixture<PreviewGalleryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewGalleryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewGalleryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
