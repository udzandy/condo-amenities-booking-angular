import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
  // template: `
  //   <h2 mat-dialog-title>{{ data.title }}</h2>
  //   <mat-dialog-content>
  //     <p>{{ data.message }}</p>
  //   </mat-dialog-content>
  //   <mat-dialog-actions align="end">
  //     <button mat-button (click)="onCancel()">Cancel</button>
  //     <button mat-raised-button color="warn" (click)="onConfirm()">Confirm</button>
  //   </mat-dialog-actions>
  // `,
  // styles: []
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
