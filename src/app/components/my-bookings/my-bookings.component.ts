import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../pages/booking/booking.service';
import { Booking } from '../../models/booking.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {

  myBookings: Booking[] = [];

  userId = '';
  userRole = '';
  searchText: string = '';
  allBookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    // GET LOGGED IN USER ID
    this.userId = localStorage.getItem('userId') || '';
    this.userRole = localStorage.getItem('role') || '';

    this.loadBookings();
  }

  // LOAD BOOKINGS FROM API
  // loadBookings() {

  //   if (this.userRole === 'Admin')
  //   {
  //     console.log('Admin Load Booking');

  //     this.bookingService
  //     .getAllBookings(this.userId)
  //     .subscribe({
  //       next: (response) => {
  //         this.myBookings = response;
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         this.snackBar.open(
  //           'Failed to load bookings',
  //           '',
  //           {
  //             duration: 3000,
  //             horizontalPosition: 'right',
  //             verticalPosition: 'top',
  //             panelClass: ['error-snackbar']
  //           });
  //       }
  //     });
  //   }
  //   else{
  //     this.bookingService
  //     .getMyBookings(this.userId)
  //     .subscribe({
  //       next: (response) => {
  //         this.myBookings = response;
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         this.snackBar.open(
  //           'Failed to load bookings',
  //           '',
  //           {
  //             duration: 3000,
  //             horizontalPosition: 'right',
  //             verticalPosition: 'top',
  //             panelClass: ['error-snackbar']
  //           });
  //       }
  //     });
  //   }
  // }

  loadBookings() {

  if (this.userRole === 'Admin')
  {
    this.bookingService
    .getAllBookings(this.userId)
    .subscribe({

      next: (response) => {

        this.allBookings = response;
        this.myBookings = response;

      },

      error: (err) => {

        console.log(err);

        this.snackBar.open(
          'Failed to load bookings',
          '',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });

      }

    });
  }
  else {

    this.bookingService
    .getMyBookings(this.userId)
    .subscribe({

      next: (response) => {

        this.allBookings = response;
        this.myBookings = response;

      },

      error: (err) => {

        console.log(err);

        this.snackBar.open(
          'Failed to load bookings',
          '',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });

      }

    });

  }
}


  filterBookings(): void {

  const search = this.searchText.toLowerCase().trim();

  if (!search) {

    this.myBookings = this.allBookings;
    return;

  }

  this.myBookings = this.allBookings.filter((booking: any) =>

    (booking.userName || '')
      .toLowerCase()
      .includes(search)

    ||

    (booking.amenityName || '')
      .toLowerCase()
      .includes(search)

    ||

    (booking.unitName || '')
      .toLowerCase()
      .includes(search)

    ||

    (booking.status || '')
      .toLowerCase()
      .includes(search)

    ||

    (booking.bookingDate || '')
      .toLowerCase()
      .includes(search)

    ||

    (booking.timeSlot || '')
      .toLowerCase()
      .includes(search)

  );

}

  cancelBooking(booking: Booking) {
    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        width: '400px',
        data: {
          title: 'Confirm Cancellation',
          message:
            `Are you sure you want to cancel booking for ${booking.amenityName}?`
        }
      });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.bookingService
          .cancelBooking(booking.bookingId, this.userId)
          .subscribe({

            next: (response) => {

              this.snackBar.open(
                response.message,
                '',
                {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: ['success-snackbar']
                });

              // REFRESH LIST
              this.loadBookings();

            },

            error: (err) => {

              console.log(err);

              this.snackBar.open(
                err?.error?.message || 'Failed to cancel booking',
                '',
                {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: ['error-snackbar']
                });
            }
          });
      }
    });

  }
}
