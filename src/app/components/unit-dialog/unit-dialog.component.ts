import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unit-dialog',
  templateUrl: './unit-dialog.component.html',
  styleUrls: ['./unit-dialog.component.scss']
})
export class UnitDialogComponent {

  model: any = {
    amenityId: null,
    unitName: '',
    unitId: undefined,
    isActive: true
  };

  amenities: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<UnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.amenities = data.amenities;

    if (data.item) {
      this.model = { ...data.item };
    }

  }

  save(): void {

    this.dialogRef.close(this.model);

  }

}
