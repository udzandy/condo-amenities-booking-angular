// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-payment-dialog',
//   templateUrl: './payment-dialog.component.html',
//   styleUrls: ['./payment-dialog.component.scss']
// })
// export class PaymentDialogComponent {

// }


import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { PaymentMethod } from 'src/app/enums/payment-method.enum';
import { PaymentService } from 'src/app/pages/admin-payments/admin-payments.component.service';

// import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent {

  model: any = {};
  paymentMethodEnum = PaymentMethod;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    private paymentService: PaymentService
  ) {

    this.model = {
      ...data,
      paymentMethod: PaymentMethod.Cash
    };

  }

  payNow(): void {

    const payload = {

      bookingId: this.model.bookingId,
      paymentMethod: this.model.paymentMethod,
      amount: this.model.amount

    };

    this.dialogRef.close(payload);

  }

}