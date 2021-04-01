import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneAuthenticationComponent } from './phone-authentication.component';

describe('PhoneAuthenticationComponent', () => {
  let component: PhoneAuthenticationComponent;
  let fixture: ComponentFixture<PhoneAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
