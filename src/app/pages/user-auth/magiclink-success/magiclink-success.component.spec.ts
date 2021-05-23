import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagiclinkSuccessComponent } from './magiclink-success.component';

describe('MagiclinkSuccessComponent', () => {
  let component: MagiclinkSuccessComponent;
  let fixture: ComponentFixture<MagiclinkSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagiclinkSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagiclinkSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
