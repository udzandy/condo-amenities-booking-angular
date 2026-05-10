import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAmenityManagementComponent } from './admin-amenity-management.component';

describe('AdminAmenityManagementComponent', () => {
  let component: AdminAmenityManagementComponent;
  let fixture: ComponentFixture<AdminAmenityManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAmenityManagementComponent]
    });
    fixture = TestBed.createComponent(AdminAmenityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
