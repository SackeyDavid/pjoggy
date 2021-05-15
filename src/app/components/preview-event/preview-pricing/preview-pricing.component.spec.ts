import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPricingComponent } from './preview-pricing.component';

describe('PreviewPricingComponent', () => {
  let component: PreviewPricingComponent;
  let fixture: ComponentFixture<PreviewPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewPricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
