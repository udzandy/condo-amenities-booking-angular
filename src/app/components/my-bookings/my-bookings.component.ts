import { Component, OnInit } from '@angular/core';
import { BookingService, Booking } from '../../pages/booking/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { SnackbarComponent } from '../shared/snackbar/snackbar.component';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {
  myBookings: Booking[] = [];

  constructor(private bookingService: BookingService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Add sample bookings for demo
    this.addSampleBookings();
    this.loadBookings();
  }

  addSampleBookings() {
    // Clear existing bookings (optional)
    // this.bookingService.clearBookings?.(); // if you implement a clear method

    const sampleBookings: Booking[] = [
      { amenity: 'bbq', date: '2026-01-15', unit: 'Pit 1', time: '09:00 AM - 04:00 PM' },
      { amenity: 'bbq', date: '2026-01-11', unit: 'Pit 1', time: '09:00 AM - 04:00 PM' },
      { amenity: 'bbq', date: '2026-01-20', unit: 'Pit 2', time: '05:00 PM - 10:00 PM' },
      { amenity: 'function-room', date: '2026-01-18', unit: 'Room A', time: '09:00 AM - 01:00 PM' },
      { amenity: 'tennis-court', date: '2026-01-16', unit: 'Court 1', time: '07:00 AM - 08:00 AM' },
      { amenity: 'tennis-court', date: '2026-01-17', unit: 'Court 1', time: '08:00 AM - 09:00 AM' }
    ];

    sampleBookings.forEach(booking => this.bookingService.saveBooking(booking));
  }

  loadBookings() {
    this.myBookings = this.bookingService.getMyBookings();
  }

  canCancel(booking: Booking): boolean {
    return this.bookingService.canCancel(booking);
  }

  cancelBooking(booking: Booking) {
    if (!this.canCancel(booking)) {
      // this.snackBar.openFromComponent(SnackbarComponent, {
      //   data: { icon: '⚠', message: 'Booking cannot be cancelled within 3 days.' },
      //   duration: 4000,
      //   verticalPosition: 'top',
      //   horizontalPosition: 'center',
      //   panelClass: ['snackbar-warning']
      // });

      this.snackBar.open('⚠ Booking cannot be cancelled within 3 days.', '', {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
    panelClass: ['snackbar-warning']
  });
      return;
    }

    this.bookingService.cancelBooking(booking);

    // this.snackBar.openFromComponent(SnackbarComponent, {
    //   data: { icon: '✔', message: 'Booking cancelled successfully!' },
    //   duration: 3000,
    //   verticalPosition: 'top',
    //   horizontalPosition: 'center',
    //   panelClass: ['snackbar-success']
    // });

    this.snackBar.open('✔ Booking cancelled successfully!', '', {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
    panelClass: ['snackbar-success']
  });

    this.loadBookings(); // Refresh list
  }
}
