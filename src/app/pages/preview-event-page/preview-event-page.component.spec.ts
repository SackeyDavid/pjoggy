import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewEventPageComponent } from './preview-event-page.component';

describe('PreviewEventPageComponent', () => {
  let component: PreviewEventPageComponent;
  let fixture: ComponentFixture<PreviewEventPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewEventPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
