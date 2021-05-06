import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationProfilePageComponent } from './organization-profile-page.component';

describe('OrganizationProfilePageComponent', () => {
  let component: OrganizationProfilePageComponent;
  let fixture: ComponentFixture<OrganizationProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
