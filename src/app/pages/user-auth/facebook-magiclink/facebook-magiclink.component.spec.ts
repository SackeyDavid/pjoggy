import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookMagiclinkComponent } from './facebook-magiclink.component';

describe('FacebookMagiclinkComponent', () => {
  let component: FacebookMagiclinkComponent;
  let fixture: ComponentFixture<FacebookMagiclinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookMagiclinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookMagiclinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
