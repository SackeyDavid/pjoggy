import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBannerComponent } from './preview-banner.component';

describe('PreviewBannerComponent', () => {
  let component: PreviewBannerComponent;
  let fixture: ComponentFixture<PreviewBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
