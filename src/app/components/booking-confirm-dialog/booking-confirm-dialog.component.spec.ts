import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingConfirmDialogComponent } from './booking-confirm-dialog.component';

describe('BookingConfirmDialogComponent', () => {
  let component: BookingConfirmDialogComponent;
  let fixture: ComponentFixture<BookingConfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingConfirmDialogComponent]
    });
    fixture = TestBed.createComponent(BookingConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
