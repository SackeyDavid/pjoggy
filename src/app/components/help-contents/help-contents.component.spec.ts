import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpContentsComponent } from './help-contents.component';

describe('HelpContentsComponent', () => {
  let component: HelpContentsComponent;
  let fixture: ComponentFixture<HelpContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpContentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
