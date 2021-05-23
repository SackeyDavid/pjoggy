import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagiclinkInvalidComponent } from './magiclink-invalid.component';

describe('MagiclinkInvalidComponent', () => {
  let component: MagiclinkInvalidComponent;
  let fixture: ComponentFixture<MagiclinkInvalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagiclinkInvalidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagiclinkInvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
