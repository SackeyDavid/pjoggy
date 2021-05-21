import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupMoreInfoComponent } from './signup-more-info.component';

describe('SignupMoreInfoComponent', () => {
  let component: SignupMoreInfoComponent;
  let fixture: ComponentFixture<SignupMoreInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupMoreInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
