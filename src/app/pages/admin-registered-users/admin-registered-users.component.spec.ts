import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisteredUsersComponent } from './admin-registered-users.component';

describe('AdminRegisteredUsersComponent', () => {
  let component: AdminRegisteredUsersComponent;
  let fixture: ComponentFixture<AdminRegisteredUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRegisteredUsersComponent]
    });
    fixture = TestBed.createComponent(AdminRegisteredUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
