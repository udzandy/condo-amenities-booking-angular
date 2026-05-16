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
        },
        error: (error: any) => {
          console.error(error);
        }
      });

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
