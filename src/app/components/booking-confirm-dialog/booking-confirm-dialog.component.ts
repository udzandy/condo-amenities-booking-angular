import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-confirm-dialog',
  templateUrl: './booking-confirm-dialog.component.html'
})
export class BookingConfirmDialogComponent {

  accepted = false;

  constructor(
    public dialogRef: MatDialogRef<BookingConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }
}

