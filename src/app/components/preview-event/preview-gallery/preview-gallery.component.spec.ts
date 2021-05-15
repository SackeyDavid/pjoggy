import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewGalleryComponent } from './preview-gallery.component';

describe('PreviewGalleryComponent', () => {
  let component: PreviewGalleryComponent;
  let fixture: ComponentFixture<PreviewGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
