import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetInvalidComponent } from './reset-invalid.component';

describe('ResetInvalidComponent', () => {
  let component: ResetInvalidComponent;
  let fixture: ComponentFixture<ResetInvalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetInvalidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
