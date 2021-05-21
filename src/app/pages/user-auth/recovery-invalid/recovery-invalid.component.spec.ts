import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryInvalidComponent } from './recovery-invalid.component';

describe('RecoveryInvalidComponent', () => {
  let component: RecoveryInvalidComponent;
  let fixture: ComponentFixture<RecoveryInvalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryInvalidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
