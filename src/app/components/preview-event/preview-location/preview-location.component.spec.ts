import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewLocationComponent } from './preview-location.component';

describe('PreviewLocationComponent', () => {
  let component: PreviewLocationComponent;
  let fixture: ComponentFixture<PreviewLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
