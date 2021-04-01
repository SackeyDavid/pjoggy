import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBasicInfoComponent } from './create-basic-info.component';

describe('CreateBasicInfoComponent', () => {
  let component: CreateBasicInfoComponent;
  let fixture: ComponentFixture<CreateBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
