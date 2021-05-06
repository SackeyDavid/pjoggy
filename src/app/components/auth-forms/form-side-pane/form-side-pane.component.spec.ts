import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSidePaneComponent } from './form-side-pane.component';

describe('FormSidePaneComponent', () => {
  let component: FormSidePaneComponent;
  let fixture: ComponentFixture<FormSidePaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSidePaneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSidePaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
