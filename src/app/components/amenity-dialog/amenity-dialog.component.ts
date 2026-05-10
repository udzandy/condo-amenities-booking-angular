import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 

@Component({
  selector: 'app-amenity-dialog',
  templateUrl: './amenity-dialog.component.html',
  styleUrls: ['./amenity-dialog.component.scss']
})
export class AmenityDialogComponent {

  model: any = {
    name: '',
    description: '',
    price: '',
    imagePath: '',
    routePath: '',
    isActive: true
  };

  constructor(
    public dialogRef: MatDialogRef<AmenityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data) {
      this.model = { ...data };
    }

  }

  save(): void {

    this.dialogRef.close(this.model);

  }

}
