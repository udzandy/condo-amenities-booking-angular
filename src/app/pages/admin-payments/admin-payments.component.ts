import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from 'src/app/components/payment-dialog/payment-dialog.component';
import { PaymentService } from './admin-payments.component.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.scss']
})
export class AdminPaymentsComponent implements OnInit {

  bookings: any[] = [];
  searchText: string = '';
  allBookings: any[] = [];

  constructor(
    private paymentService: PaymentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.paymentService.getAdminPayments()
      .subscribe({
        next: (response: any) => {
          this.bookings = response;
          this.allBookings = response;
        },
        error: (error: any) => {
          console.error(error);
        }
      });

  }

  filterBookings(): void {

  const search = this.searchText
    .toLowerCase()
    .trim();

  if (!search) {

    this.bookings = this.allBookings;
    return;

  }

  this.bookings = this.allBookings.filter((booking: any) =>

    (booking.bookingId + '')
      .toLowerCase()
      .includes(search)

    ||

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

    (booking.slotTime || '')
      .toLowerCase()
      .includes(search)

    ||

    (booking.paymentMethod || '')
      .toLowerCase()
      .includes(search)

    ||

    (booking.bookingStatus || '')
      .toLowerCase()
      .includes(search)

    ||

    ((booking.isPaid ? 'paid' : 'pending'))
      .includes(search)

  );

}

  openPaymentDialog(booking: any): void {

    const dialogRef = this.dialog.open(
      PaymentDialogComponent,
      {
        width: '600px',
        data: booking
      });

    dialogRef.afterClosed()
      .subscribe(result => {

        if (result) {

          this.paymentService.payBooking(result).subscribe({
            next: () => {
              this.snackBar.open(
                'Payment successfully',
                '',
                {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: ['success-snackbar']
                }
              );

              this.loadBookings();
            },
            error: (error: any) => {
              console.error(error);
              this.snackBar.open(
                'Payment failed.',
                '',
                {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top',
                  panelClass: ['error-snackbar']
                }
              );
            }
          });
        }

      });

  }

}
