import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappeningNowComponent } from './happening-now.component';

describe('HappeningNowComponent', () => {
  let component: HappeningNowComponent;
  let fixture: ComponentFixture<HappeningNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HappeningNowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HappeningNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
