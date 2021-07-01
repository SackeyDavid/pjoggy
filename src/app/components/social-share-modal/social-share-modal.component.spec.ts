import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialShareModalComponent } from './social-share-modal.component';

describe('SocialShareModalComponent', () => {
  let component: SocialShareModalComponent;
  let fixture: ComponentFixture<SocialShareModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialShareModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialShareModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
