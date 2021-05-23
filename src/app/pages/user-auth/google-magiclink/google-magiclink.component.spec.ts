import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMagiclinkComponent } from './google-magiclink.component';

describe('GoogleMagiclinkComponent', () => {
  let component: GoogleMagiclinkComponent;
  let fixture: ComponentFixture<GoogleMagiclinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMagiclinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMagiclinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
