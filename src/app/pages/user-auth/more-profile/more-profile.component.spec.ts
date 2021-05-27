import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreProfileComponent } from './more-profile.component';

describe('MoreProfileComponent', () => {
  let component: MoreProfileComponent;
  let fixture: ComponentFixture<MoreProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
