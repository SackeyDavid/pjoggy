import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewOrganizersComponent } from './preview-organizers.component';

describe('PreviewOrganizersComponent', () => {
  let component: PreviewOrganizersComponent;
  let fixture: ComponentFixture<PreviewOrganizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewOrganizersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewOrganizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
