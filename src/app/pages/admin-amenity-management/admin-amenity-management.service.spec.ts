import { TestBed } from '@angular/core/testing';

import { AdminAmenityManagementService } from './admin-amenity-management.service';

describe('AdminAmenityManagementService', () => {
  let service: AdminAmenityManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAmenityManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
