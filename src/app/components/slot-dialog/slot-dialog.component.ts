import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-slot-dialog',
  templateUrl: './slot-dialog.component.html',
  styleUrls: ['./slot-dialog.component.scss']
})

export class SlotDialogComponent {

  model: any = {
    unitId: null,
    startTime: '',
    endTime: '',
    isActive: true
  };

  amenities: any[] = [];

  units: any[] = [];

  filteredUnits: any[] = [];

  selectedAmenityId!: number;

  constructor(
    public dialogRef: MatDialogRef<SlotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.amenities = data.amenities;
    this.units = data.units;

    if (data.item) {
      this.model = { ...data.item };
    }

  }

  filterUnits(): void {

    this.filteredUnits = this.units.filter(
      x => x.amenityId === this.selectedAmenityId
    );

  }

  save(): void {

    this.dialogRef.close(this.model);

  }

}

