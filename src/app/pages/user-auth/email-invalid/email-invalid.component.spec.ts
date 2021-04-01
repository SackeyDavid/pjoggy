import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInvalidComponent } from './email-invalid.component';

describe('EmailInvalidComponent', () => {
  let component: EmailInvalidComponent;
  let fixture: ComponentFixture<EmailInvalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailInvalidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
