import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AmenityDialogComponent } from 'src/app/components/amenity-dialog/amenity-dialog.component';
import { SlotDialogComponent } from 'src/app/components/slot-dialog/slot-dialog.component';
import { UnitDialogComponent } from 'src/app/components/unit-dialog/unit-dialog.component';

@Component({
  selector: 'app-admin-amenity-management',
  templateUrl: './admin-amenity-management.component.html',
  styleUrls: ['./admin-amenity-management.component.scss']
})
export class AdminAmenityManagementComponent implements OnInit {

  amenities: any[] = [];

  units: any[] = [];

  slots: any[] = [];

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.loadAmenities();

    this.loadUnits();

    this.loadSlots();

  }

  // ============================================
  // LOAD DATA
  // ============================================

  loadAmenities(): void {

    // API CALL HERE

  }

  loadUnits(): void {

    // API CALL HERE

  }

  loadSlots(): void {

    // API CALL HERE

  }

  // ============================================
  // DIALOGS
  // ============================================

  openAmenityDialog(item?: any): void {

  const dialogRef = this.dialog.open(
    AmenityDialogComponent,
    {
      width: '500px',
      data: item
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result) return;

    console.log(result);

    // SAVE API HERE

  });

}

  openUnitDialog(item?: any): void {

  const dialogRef = this.dialog.open(
    UnitDialogComponent,
    {
      width: '500px',
      data: {
        item: item,
        amenities: this.amenities
      }
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result) return;

    console.log(result);

    // SAVE API HERE

  });

}

  openSlotDialog(item?: any): void {

  const dialogRef = this.dialog.open(
    SlotDialogComponent,
    {
      width: '500px',
      data: {
        item: item,
        amenities: this.amenities,
        units: this.units
      }
    }
  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result) return;

    console.log(result);

    // SAVE API HERE

  });

}

  // ============================================
  // DELETE
  // ============================================

  deleteAmenity(item: any): void {

    if (!confirm(
      'Delete amenity with related units, slots and bookings?'
    )) return;

    // DELETE API

  }

  deleteUnit(item: any): void {

    if (!confirm(
      'Delete unit with related slots and bookings?'
    )) return;

    // DELETE API

  }

  deleteSlot(item: any): void {

    if (!confirm(
      'Delete slot with related bookings?'
    )) return;

    // DELETE API

  }
  

}
